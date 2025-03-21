import { BaseItem, Armor, Weapon, Potion, GenericMaterial } from "../item.js";

export class ItemCollection {
  protected items: BaseItem[] = [];

  constructor(
    protected createItem: (
      id: string,
      name: string,
      description: string,
      material: GenericMaterial,
      weight: number,
      price: number,
    ) => BaseItem,
  ) {}

  addItem(newItem: BaseItem): void {
    if (this.items.some((i) => i.id === newItem.id)) {
      console.log(`/// WARNING: Item with ID ${newItem.id} already exists ///`);
      return;
    }
    this.items.push(newItem);
  }

  removeItem(removeId: string): void {
    this.items = this.items.filter((i) => i.id !== removeId);
  }

  getItems(): BaseItem[] {
    return this.items;
  }

  modifyItem(
    modifyId: string,
    parameter: keyof BaseItem,
    newValue: string | GenericMaterial | number,
  ): void {
    const item = this.items.find((i) => i.id === modifyId);
    if (item) {
      item[parameter] = newValue as never;
    } else {
      console.log(`/// WARNING: Item with ID ${modifyId} not found ///`);
    }
  }

  private printFormatted(title: string, items: BaseItem[]): void {
    console.log(`\n=== ${title} ===`);
    if (items.length === 0) {
      console.log("No items found.");
    } else {
      console.table(
        items.map((item) => ({
          ID: item.id,
          Name: item.name,
          Description: item.description,
          Material: item.material,
          Weight: item.weight,
          Price: item.price,
        }))
      );
    }
  }

  getItemBy(
    parameter: keyof BaseItem,
    value: string | GenericMaterial | number,
  ): BaseItem[] {
    const result = this.items.filter((i) => i[parameter] === value);
    this.printFormatted(`Items filtered by ${parameter} = ${value}`, result);
    return result;
  }

  getItemsByName(name: string): BaseItem[] {
    const result = this.items.filter((i) =>
      i.name.toLowerCase().includes(name.toLowerCase())
    );
    this.printFormatted(`Items filtered by name including "${name}"`, result);
    return result;
  }

  getItemsByType(type: "Armor" | "Weapon" | "Potion"): BaseItem[] {
    const result = this.items.filter((i) => {
      if (type === "Armor") return i instanceof Armor;
      if (type === "Weapon") return i instanceof Weapon;
      if (type === "Potion") return i instanceof Potion;
      return false;
    });
    this.printFormatted(`Items filtered by type "${type}"`, result);
    return result;
  }

  getItemsByDescription(description: string): BaseItem[] {
    const result = this.items.filter((i) =>
      i.description.toLowerCase().includes(description.toLowerCase())
    );
    this.printFormatted(`Items filtered by description including "${description}"`, result);
    return result;
  }

  sortItemsByName(ascending: boolean = true): BaseItem[] {
    const result = this.items.slice().sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return ascending ? comparison : -comparison;
    });
    this.printFormatted(
      `Items sorted by name ${ascending ? "ascending" : "descending"}`,
      result
    );
    return result;
  }

  sortItemsByPrice(ascending: boolean = true): BaseItem[] {
    const result = this.items.slice().sort((a, b) => {
      const comparison = a.price - b.price;
      return ascending ? comparison : -comparison;
    });
    this.printFormatted(
      `Items sorted by price ${ascending ? "ascending" : "descending"}`,
      result
    );
    return result;
  }
}
