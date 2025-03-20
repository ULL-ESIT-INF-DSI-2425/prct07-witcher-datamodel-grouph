import { JsonItemCollection } from "./data/itemDB.js";
import { JsonRegisterCollection } from "./data/registerDB.js";

export class Inventory {
  protected items: JsonItemCollection;
  protected register: JsonRegisterCollection;

  constructor() {
    this.items = new JsonItemCollection();
    this.register = new JsonRegisterCollection();
  }

  getItems(): JsonItemCollection {
    return this.items;
  }

  getRegister(): JsonRegisterCollection {
    return this.register;
  }
}
