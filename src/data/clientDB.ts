import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import { Hunter, Race } from "../hunter.js";
import { ClientCollection } from "../collections/clientCollection.js";

/**
 * Schema for the client database
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ClientDataBaseSchema = { clients: any[] };

/**
 * Path to the database file
 */
const DB_FILE = "Clientdb.json";
const adapter = new JSONFileSync<ClientDataBaseSchema>(DB_FILE);

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

    // Inicializamos LowSync con defaultData pero luego leemos el contenido real
    this.database = new LowSync(adapter, { clients: [] });
    this.database.read();

    // Si no hay datos (o los datos no son un array), inicializamos la estructura.
    if (!this.database.data || !Array.isArray(this.database.data.clients)) {
      console.log("📂 Database was empty. Initializing...");
      this.database.data = { clients: [] };
      this.database.write();
    }

    // Al cargar, filtramos objetos vacíos y mapeamos usando las claves correctas.
    // Se admite que los datos puedan venir con propiedades "id" o "_id", etc.
    this.clients = this.database.data.clients
      .filter((h) => Object.keys(h).length > 0)
      .map((h) => {
        const id = h.id ?? h._id;
        const name = h.name ?? h._name;
        const race = h.race ?? h._race;
        const location = h.location ?? h._location;
        return this.createHunter(id, name, race, location);
      });

    console.log("📂 Database loaded with", this.clients.length, "clients.");
  }

  /**
   * Guarda el estado actual de la base de datos.
   */
  private saveDatabase(): void {
    // Leer antes de modificar para tener los datos actuales.
    this.database.read();
    // Guardamos usando el método toJSON de cada cliente si existe.
    this.database.data.clients = this.clients.map((client) =>
      typeof client.toJSON === "function" ? client.toJSON() : client,
    );
    this.database.write();
  }

  /**
   * Agrega un nuevo cliente a la colección.
   * @param newHunter El nuevo cliente (Hunter) a agregar.
   */
  addClient(newHunter: Hunter): void {
    this.database.read(); // Leer estado actual
    super.addClient(newHunter);
    this.saveDatabase();
  }

  /**
   * Elimina un cliente de la colección.
   * @param removeId El ID del cliente a eliminar.
   */
  removeClient(removeId: string): void {
    this.database.read();
    super.removeClient(removeId);
    this.saveDatabase();
  }

  /**
   * Modifica la información de un cliente.
   * @param modifyId El ID del cliente a modificar.
   * @param parameter El campo a modificar.
   * @param newValue El nuevo valor para el campo.
   */
  modifyClient(
    modifyId: string,
    parameter: keyof Hunter,
    newValue: string | Race,
  ): void {
    this.database.read();
    super.modifyClient(modifyId, parameter, newValue);
    this.saveDatabase();
  }
}
