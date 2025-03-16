import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import { Weapon, Armor, Potion, ArmorMaterial, WeaponMaterial, Effect, PotionMaterial, Item } from "./item.js";
import { ItemCollection } from "./itemCollection.js";

type ItemDataBaseSchema = { weapons: {weapon: Weapon, amount: number}[], armors: {armor: Armor, amount: number}[], potions: {potion: Potion, amount: number}[] };

export class JsonItemCollection extends ItemCollection {
  private database: LowSync<ItemDataBaseSchema>;

  constructor() {
    super();
    const adapter = new JSONFileSync<ItemDataBaseSchema>("Itemdb.json");
    this.database = new LowSync(adapter, { weapons: [], armors: [], potions: [] });
    this.database.read();

    if (this.database.data == null) {
      this.database.data = { weapons: [], armors: [], potions: [] };
      this.database.write();
    } else {
      // Deserialize merchants into Merchant instances using the factory function
      this.database.data.armors.forEach((a) => {
        this.addArmor(new Armor(a.armor.id, a.armor.name, a.armor.description, a.armor.material, a.armor.weight, a.armor.price))
      })
      this.database.data.weapons.forEach((w) => {
        this.addWeapon(new Weapon(w.weapon.id, w.weapon.name, w.weapon.description, w.weapon.material, w.weapon.weight, w.weapon.price))
      })
      this.database.data.potions.forEach((p) => {
        this.addPotion(new Potion(p.potion.id, p.potion.name, p.potion.description, p.potion.material, p.potion.weight, p.potion.price, p.potion.effect))
      })
    }
  }

  addWeapon(newWeapon: Weapon): void {
    super.addWeapon(newWeapon);
    this.database.data.weapons = this.weapons;
    this.database.write();
  }

  removeWeapon(removeId: string): void {
    super.subtractWeapon(removeId);
    this.database.data.weapons = this.weapons;
    this.database.write();
  }

  modifyWeapon(
    modifyId: string,
    parameter: keyof Weapon,
    newValue: string | WeaponMaterial,
  ): void {
    super.modifyWeapon(modifyId, parameter, newValue);
    this.database.data.weapons = this.weapons;
    this.database.write();
  }

  addArmor(newArmor: Armor): void {
    super.addArmor(newArmor);
    this.database.data.armors = this.armors;
    this.database.write();
  }

  removeArmor(removeId: string): void {
    super.subtractArmor(removeId);
    this.database.data.armors = this.armors;
    this.database.write();
  }

  modifyArmor(
    modifyId: string,
    parameter: keyof Armor,
    newValue: string | ArmorMaterial,
  ): void {
    super.modifyArmor(modifyId, parameter, newValue);
    this.database.data.armors = this.armors;
    this.database.write();
  }

  addPotion(newPotion: Potion): void {
    super.addPotion(newPotion);
    this.database.data.potions = this.potions;
    this.database.write();
  }

  removePotion(removeId: string): void {
    super.subtractPotion(removeId);
    this.database.data.potions = this.potions;
    this.database.write();
  }

  modifyPotion(
    modifyId: string,
    parameter: keyof Potion,
    newValue: string | PotionMaterial | Effect,
  ): void {
    super.modifyPotion(modifyId, parameter, newValue);
    this.database.data.potions = this.potions;
    this.database.write();
  }

  getItemsBy(
    parameter: keyof Item,
    value: string | ArmorMaterial | WeaponMaterial | PotionMaterial | Effect,
  ): ({armor: Armor, amount: number} | {weapon: Weapon, amount: number} | {potion: Potion, amount: number})[] {
    let result: ({armor: Armor, amount: number} | {weapon: Weapon, amount: number} | {potion: Potion, amount: number})[] = this.armors.filter((i) => i.armor[parameter] === value);
    result = result.concat(this.weapons.filter((i) => i.weapon[parameter] === value));
    result = result.concat(this.potions.filter((i) => i.potion[parameter] === value));
    return result;
  }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// type ItemDataBaseSchema = { items: { item: Item }[] };

// const adapter = new JSONFile<ItemDataBaseSchema>("Itemdb.json");
// const cdbs: ItemDataBaseSchema = { items: [] };
// const ItemDB = new Low(adapter, cdbs);

// async function initIDB() {
//   await ItemDB.read(); // Cargar datos desde db.json

//   // Si la base de datos está vacía, establece valores por defecto
//   ItemDB.data ||= { items: [] };

//   await ItemDB.write(); // Guardar cambios en db.json
// }

// async function AddItem(newItem: Item) {
//   await ItemDB.read(); // Asegurarse de que los datos están actualizados
//   if (ItemDB.data.items.find((item) => item.item.id === newItem.id)) {
//     console.log("/// WARNING: El item ya existe ///");
//     return;
//   } else {
//     ItemDB.data.items.push({ item: newItem });
//   }
//   await ItemDB.write();
// }

// async function RemoveItem(remove_id: number) {
//   await ItemDB.read();
//   if (ItemDB.data.items.length === 0) {
//     console.log("/// WARNING: No hay items registrados ///");
//     return;
//   }

//   if (!ItemDB.data.items.find((item) => item.item.id === remove_id)) {
//     console.log("/// WARNING: El item no existe ///");
//     return;
//   }

//   const newitems = ItemDB.data.items.filter(
//     (client) => client.item.id !== remove_id,
//   );

//   ItemDB.data.items = newitems;
//   await ItemDB.write();
// }

// async function Getitems() {
//   await ItemDB.read(); // Cargar los datos desde db.json
//   ItemDB.data.items.forEach((item) => {
//     console.log("ID: " + item.item.id);
//     console.log("Name: " + item.item.name);
//     console.log("Description: " + item.item.description);
//     console.log("Material: " + item.item.material);
//     console.log("Weight: " + item.item.weight);
//     console.log("Price: " + item.item.price);
//     console.log("-------------------------------");
//   });
// }

// type ItemAtributte = "name" | "description" | "material" | "weight" | "price";

// async function ModifyItem(
//   id: number,
//   attribute: ItemAtributte,
//   value: string | number | GenericMaterial,
// ) {
//   await ItemDB.read();
//   if (ItemDB.data.items.length === 0) {
//     console.log("/// WARNING: No hay items registrados ///");
//     return;
//   }
//   const item = ItemDB.data.items.find((item) => item.item.id === id);
//   if (!item) {
//     console.log("/// WARNING: El item no existe ///");
//     return;
//   }
//   switch (attribute) {
//     case "name":
//       item.item.name = value as string;
//       break;
//     case "description":
//       item.item.description = value as string;
//       break;
//     case "material":
//       item.item.material = value as GenericMaterial;
//       break;
//     case "weight":
//       item.item.weight = value as number;
//       break;
//     case "price":
//       item.item.price = value as number;
//       break;
//   }
//   await ItemDB.write();
// }

// async function GetItemBy(
//   parametro: ItemAtributte,
//   value: string | number | GenericMaterial,
//   order: "asc" | "desc" = "asc",
// ): Promise<{ item: Item }[] | undefined> {
//   await ItemDB.read();
//   const items = ItemDB.data.items.filter(
//     (item) => item.item[parametro] === value,
//   );
//   if (items.length === 0) {
//     console.log("/// WARNING: No se encontraron items ///");
//     return;
//   }
//   // Ordenar items
//   if (typeof value === "string") {
//     if (order === "asc") {
//       items.sort((a, b) => a.item.name.localeCompare(b.item.name));
//     }
//     if (order === "desc") {
//       items.sort((a, b) => b.item.name.localeCompare(a.item.name));
//     }
//   }
//   if (typeof value === "number") {
//     if (order === "asc") {
//       items.sort((a, b) => a.item.price - b.item.price);
//     }
//     if (order === "desc") {
//       items.sort((a, b) => b.item.price - a.item.price);
//     }
//   }

//   return items;
// }