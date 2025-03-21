import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import { Hunter, Race } from "../hunter.js";
import { ClientCollection } from "../collections/clientCollection.js";

/**
 * Schema for the client database
 */
type ClientDataBaseSchema = { clients: Hunter[] };

/**
 * Class to manage a collection of clients
 */
export class JsonClientCollection extends ClientCollection {
  private database: LowSync<ClientDataBaseSchema>;

  /**
   * Constructor for the JsonClientCollection class
   */
  constructor() {
    super((id, name, race, location) => new Hunter(id, name, race, location));
    const adapter = new JSONFileSync<ClientDataBaseSchema>("Clientdb.json");
    this.database = new LowSync(adapter, { clients: [] });
    this.database.read();

    if (this.database.data == null) {
      this.database.data = { clients: [] };
      this.database.write();
    } else {
      // Deserialize clients into Hunter instances using the factory function
      this.database.data.clients.forEach((h) =>
        this.addClient(this.createHunter(h.id, h.name, h.race, h.location)),
      );
    }
  }

  /**
   * Method to get all clients
   * @returns All clients in the collection
   */
  addClient(newHunter: Hunter): void {
    super.addClient(newHunter);
    this.database.data.clients = this.clients;
    this.database.write();
  }

  /**
   * Method to add a new client to the collection
   * @param newHunter The new hunter to add
   * @returns void
   */
  removeClient(removeId: string): void {
    super.removeClient(removeId);
    this.database.data.clients = this.clients;
    this.database.write();
  }

  /**
   * Method to modify a client's information
   * @param modifyId The id of the client to modify
   * @param parameter The parameter to modify
   * @param newValue The new value for the parameter
   * @returns
   */
  modifyClient(
    modifyId: string,
    parameter: keyof Hunter,
    newValue: string | Race,
  ): void {
    super.modifyClient(modifyId, parameter, newValue);
    this.database.data.clients = this.clients;
    this.database.write();
  }
}
