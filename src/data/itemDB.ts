import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import {
  Item,
  Armor,
  Weapon,
  Potion,
  ArmorMaterial,
  GenericMaterial,
  PotionMaterial,
  WeaponMaterial,
} from "../item.js";
import { ItemCollection } from "../collections/itemCollection.js";

type ItemDataBaseSchema = { items: Item[] };

export class JsonItemCollection extends ItemCollection {
  private database: LowSync<ItemDataBaseSchema>;

  constructor() {
    super((id, name, description, material, weight, price) => {
      // Check if the ID is valid
      if (!id) {
        throw new Error(`Invalid ID: ${id}`);
      }

      // Determine the type of item based on the ID prefix
      if (id.startsWith("A-")) {
        return new Armor(
          id,
          name,
          description,
          material as ArmorMaterial,
          weight,
          price,
        );
      } else if (id.startsWith("W-")) {
        return new Weapon(
          id,
          name,
          description,
          material as WeaponMaterial,
          weight,
          price,
        );
      } else if (id.startsWith("P-")) {
        // For Potion, we need to include the effect
        const potionData = this.database.data.items.find(
          (i) => i.id === id,
        ) as Potion;
        if (!potionData) {
          throw new Error(`Potion data not found for ID: ${id}`);
        }
        return new Potion(
          id,
          name,
          description,
          material as PotionMaterial,
          weight,
          price,
          potionData.effect,
        );
      } else {
        throw new Error(`Unknown item type for ID: ${id}`);
      }
    });

    const adapter = new JSONFileSync<ItemDataBaseSchema>("Itemdb.json");
    this.database = new LowSync(adapter, { items: [] });
    this.database.read();

    if (this.database.data == null) {
      this.database.data = { items: [] };
      this.database.write();
    } else {
      // Log the loaded data for debugging
      console.log("Loaded data from database:", this.database.data);

      // Deserialize items into their respective subclasses
      this.database.data.items.forEach((i) => {
        try {
          const item = this.createItem(
            i.id,
            i.name,
            i.description,
            i.material,
            i.weight,
            i.price,
          );
          this.addItem(item);
        } catch (error) {
          console.error(`Error loading item with ID ${i.id}:`, error);
        }
      });
    }
  }

  addItem(newItem: Item): void {
    super.addItem(newItem);
    this.database.data.items = this.items;
    this.database.write();
  }

  removeItem(removeId: string): void {
    super.removeItem(removeId);
    this.database.data.items = this.items;
    this.database.write();
  }

  modifyItem(
    modifyId: string,
    parameter: keyof Item,
    newValue: string | GenericMaterial | number,
  ): void {
    super.modifyItem(modifyId, parameter, newValue);
    this.database.data.items = this.items;
    this.database.write();
  }
}
