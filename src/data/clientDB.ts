import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import { Hunter, Race } from "../hunter.js";
import { ClientCollection } from "../collections/clientCollection.js";

type ClientDataBaseSchema = { clients: Hunter[] };

export class JsonClientCollection extends ClientCollection {
  private database: LowSync<ClientDataBaseSchema>;

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

  addClient(newHunter: Hunter): void {
    super.addClient(newHunter);
    this.database.data.clients = this.clients;
    this.database.write();
  }

  removeClient(removeId: string): void {
    super.removeClient(removeId);
    this.database.data.clients = this.clients;
    this.database.write();
  }

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
