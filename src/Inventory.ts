import { JsonItemCollection } from "./itemDB.js";
import { JsonRegisterCollection } from "./registerDB.js";

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