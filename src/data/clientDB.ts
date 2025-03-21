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

    // Initialize the database if it's empty or invalid
    if (!this.database.data || !Array.isArray(this.database.data.clients)) {
      this.database.data = { clients: [] };
      this.database.write();
    }

    // Deserialize clients into Hunter instances using the factory function
    this.database.data.clients.forEach((h) => {
      if (h.id && h.name && h.race && h.location) {
        const hunter = this.createHunter(h.id, h.name, h.race, h.location);
        this.addClient(hunter);
      } else {
        console.warn("Skipping invalid client data:", h);
      }
    });
  }

  /**
   * Method to add a new client to the collection
   * @param newHunter The new hunter to add
   * @returns void
   */
  addClient(newHunter: Hunter): void {
    if (
      !newHunter.id ||
      !newHunter.name ||
      !newHunter.race ||
      !newHunter.location
    ) {
      console.warn("Skipping invalid client:", newHunter);
      return;
    }

    // Check if the client already exists
    const existingClient = this.clients.find(
      (client) => client.id === newHunter.id,
    );
    if (existingClient) {
      console.warn(`Client with id ${newHunter.id} already exists.`);
      return;
    }

    super.addClient(newHunter);
    this.database.data.clients = this.clients;
    this.database.write();
    console.log(`Added client: ${newHunter.name}`);
  }

  /**
   * Method to remove a client from the collection
   * @param removeId The id of the client to remove
   * @returns void
   */
  removeClient(removeId: string): void {
    super.removeClient(removeId);
    this.database.data.clients = this.clients;
    this.database.write();
    console.log(`Removed client with id: ${removeId}`);
  }

  /**
   * Method to modify a client's information
   * @param modifyId The id of the client to modify
   * @param parameter The parameter to modify
   * @param newValue The new value for the parameter
   * @returns void
   */
  modifyClient(
    modifyId: string,
    parameter: keyof Hunter,
    newValue: string | Race,
  ): void {
    super.modifyClient(modifyId, parameter, newValue);
    this.database.data.clients = this.clients;
    this.database.write();
    console.log(`Modified client with id: ${modifyId}`);
  }
}
