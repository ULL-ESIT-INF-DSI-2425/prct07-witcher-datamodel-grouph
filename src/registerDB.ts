import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import { RegisterCollection, OperationType, Operation } from "./registerCollection.js";

type RegisterDataBaseSchema = { operations: Operation[] };

export class JsonRegisterCollection extends RegisterCollection {
  private database: LowSync<RegisterDataBaseSchema>;

  constructor() {
    super();
    const adapter = new JSONFileSync<RegisterDataBaseSchema>("Registerdb.json");
    this.database = new LowSync(adapter, { operations: [] });
    this.database.read();

    if (this.database.data == null) {
      this.database.data = { operations: [] };
      this.database.write();
    } else {
      // Deserialize merchants into Merchant instances using the factory function
      this.database.data.operations.forEach((o) => {
        this.addOperation(o);
      })
    }
  }

  addOperation(newOperation: Operation): void {
    super.addOperation(newOperation);
    this.database.data.operations = this.operations;
    this.database.write();
  }

    get operations(): Operation[] {
        return this.database.data.operations;
    }
}

