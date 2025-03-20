import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import {
  RegisterCollection,
  Transaction,
} from "../collections/registerCollection.js";

type TransactionDataBaseSchema = { transactions: Transaction[] };

export class JsonRegisterCollection extends RegisterCollection {
  private database: LowSync<TransactionDataBaseSchema>;

  constructor() {
    super();
    const adapter = new JSONFileSync<TransactionDataBaseSchema>(
      "Registerdb.json",
    );
    this.database = new LowSync(adapter, { transactions: [] });
    this.database.read();

    if (this.database.data == null) {
      this.database.data = { transactions: [] };
      this.database.write();
    } else {
      // Deserialize transactions from the database
      this.database.data.transactions.forEach((t) => this.add(t));
    }
  }

  add(transaction: Transaction): void {
    super.add(transaction);
    this.database.data.transactions = this.transactions;
    this.database.write();
  }
}
