import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import {
  BaseItem,
  Armor,
  Weapon,
  Potion,
  ArmorMaterial,
  GenericMaterial,
  PotionMaterial,
  WeaponMaterial,
} from "../item.js";
import { ItemCollection } from "../collections/itemCollection.js";
import fs from "fs";

/**
 * Schema for the item database
 */
type ItemDataBaseSchema = { items: any[] };

/**
 * Path to the database file
 */
const DB_FILE = "Itemdb.json";
const adapter = new JSONFileSync<ItemDataBaseSchema>(DB_FILE);

/**
 * Class to manage a collection of items
 */
export class JsonItemCollection extends ItemCollection {
  private database: LowSync<ItemDataBaseSchema>;

  /**
   * Constructor for the JsonItemCollection class
   */
  constructor() {
    super((id, name, description, material, weight, price) => {
      if (!id || typeof id !== "string") {
        throw new Error(`Invalid ID: ${id}`);
      }
      if (id.startsWith("A-")) {
        return new Armor(id, name, description, material as ArmorMaterial, weight, price);
      } else if (id.startsWith("W-")) {
        return new Weapon(id, name, description, material as WeaponMaterial, weight, price);
      } else if (id.startsWith("P-")) {
        return new Potion(id, name, description, material as PotionMaterial, weight, price, "Unknown Effect");
      } else {
        throw new Error(`Unknown item type for ID: ${id}`);
      }
    });

    // Inicializamos LowSync con defaultData pero luego leemos el contenido real
    this.database = new LowSync(adapter, { items: [] });
    this.database.read();

    // Si no hay datos (o los datos no son un array), inicializamos la estructura.
    if (!this.database.data || !Array.isArray(this.database.data.items)) {
      console.log("📂 Item database was empty. Initializing...");
      this.database.data = { items: [] };
      this.database.write();
    }

    // Al cargar, filtramos objetos vacíos y mapeamos correctamente.
    this.items = this.database.data.items
      .filter((i) => i && Object.keys(i).length > 0 && i.id)
      .map((i) => {
        try {
          return this.createItem(i.id, i.name, i.description, i.material, i.weight, i.price);
        } catch (error) {
          console.error(`Error creating item with ID ${i.id}:`, error);
          return null;
        }
      })
      .filter((i) => i !== null);

    console.log("📂 Item database loaded with", this.items.length, "items.");
  }

  /**
   * Guarda el estado actual de la base de datos.
   */
  private saveDatabase(): void {
    this.database.read();
    this.database.data.items = this.items.map((item) =>
      typeof item.toJSON === "function" ? item.toJSON() : item
    );
    this.database.write();
  }

  /**
   * Agrega un nuevo ítem a la colección.
   * @param newItem El nuevo ítem a agregar.
   */
  addItem(newItem: BaseItem): void {
    this.database.read();
    super.addItem(newItem);
    this.saveDatabase();
  }

  /**
   * Elimina un ítem de la colección.
   * @param removeId El ID del ítem a eliminar.
   */
  removeItem(removeId: string): void {
    this.database.read();
    super.removeItem(removeId);
    this.saveDatabase();
  }

  /**
   * Modifica la información de un ítem.
   * @param modifyId El ID del ítem a modificar.
   * @param parameter El campo a modificar.
   * @param newValue El nuevo valor para el campo.
   */
  modifyItem(modifyId: string, parameter: keyof BaseItem, newValue: string | GenericMaterial | number): void {
    this.database.read();
    super.modifyItem(modifyId, parameter, newValue);
    this.saveDatabase();
  }
}