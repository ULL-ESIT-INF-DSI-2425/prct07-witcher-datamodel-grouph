import { Item, Armor, Weapon, Potion, GenericMaterial } from "../item.js";

export class ItemCollection {
  protected items: Item[] = [];

  constructor(
    protected createItem: (
      id: string,
      name: string,
      description: string,
      material: GenericMaterial,
      weight: number,
      price: number,
    ) => Item,
  ) {}

  addItem(newItem: Item): void {
    if (this.items.some((i) => i.id === newItem.id)) {
      console.log(`/// WARNING: Item with ID ${newItem.id} already exists ///`);
      return;
    }
    this.items.push(newItem);
  }

  removeItem(removeId: string): void {
    this.items = this.items.filter((i) => i.id !== removeId);
  }

  getItems(): Item[] {
    return this.items;
  }

  modifyItem(
    modifyId: string,
    parameter: keyof Item,
    newValue: string | GenericMaterial | number,
  ): void {
    const item = this.items.find((i) => i.id === modifyId);
    if (item) {
      item[parameter] = newValue as never;
    } else {
      console.log(`/// WARNING: Item with ID ${modifyId} not found ///`);
    }
  }

  getItemBy(
    parameter: keyof Item,
    value: string | GenericMaterial | number,
  ): Item[] {
    return this.items.filter((i) => i[parameter] === value);
  }

  // New methods for querying and sorting

  getItemsByName(name: string): Item[] {
    return this.items.filter((i) =>
      i.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  getItemsByType(type: "Armor" | "Weapon" | "Potion"): Item[] {
    return this.items.filter((i) => {
      if (type === "Armor") return i instanceof Armor;
      if (type === "Weapon") return i instanceof Weapon;
      if (type === "Potion") return i instanceof Potion;
      return false;
    });
  }

  getItemsByDescription(description: string): Item[] {
    return this.items.filter((i) =>
      i.description.toLowerCase().includes(description.toLowerCase()),
    );
  }

  sortItemsByName(ascending: boolean = true): Item[] {
    return this.items.slice().sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return ascending ? comparison : -comparison;
    });
  }

  sortItemsByPrice(ascending: boolean = true): Item[] {
    return this.items.slice().sort((a, b) => {
      const comparison = a.price - b.price;
      return ascending ? comparison : -comparison;
    });
  }
}
