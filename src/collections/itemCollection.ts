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

  getItemBy(
    parameter: keyof BaseItem,
    value: string | GenericMaterial | number,
  ): BaseItem[] {
    return this.items.filter((i) => i[parameter] === value);
  }

  // New methods for querying and sorting

  getItemsByName(name: string): BaseItem[] {
    return this.items.filter((i) =>
      i.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  getItemsByType(type: "Armor" | "Weapon" | "Potion"): BaseItem[] {
    return this.items.filter((i) => {
      if (type === "Armor") return i instanceof Armor;
      if (type === "Weapon") return i instanceof Weapon;
      if (type === "Potion") return i instanceof Potion;
      return false;
    });
  }

  getItemsByDescription(description: string): BaseItem[] {
    return this.items.filter((i) =>
      i.description.toLowerCase().includes(description.toLowerCase()),
    );
  }

  sortItemsByName(ascending: boolean = true): BaseItem[] {
    return this.items.slice().sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return ascending ? comparison : -comparison;
    });
  }

  sortItemsByPrice(ascending: boolean = true): BaseItem[] {
    return this.items.slice().sort((a, b) => {
      const comparison = a.price - b.price;
      return ascending ? comparison : -comparison;
    });
  }
}
