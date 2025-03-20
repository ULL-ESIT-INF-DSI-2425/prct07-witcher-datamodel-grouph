import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import { Merchant, Profession } from "../merchant.js";
import { MerchantCollection } from "../collections/merchantCollection.js";

type MerchantDataBaseSchema = { merchants: Merchant[] };

export class JsonMerchantCollection extends MerchantCollection {
  private database: LowSync<MerchantDataBaseSchema>;

  constructor() {
    super(
      (id, name, profession, location) =>
        new Merchant(id, name, profession, location),
    );
    const adapter = new JSONFileSync<MerchantDataBaseSchema>("Merchantdb.json");
    this.database = new LowSync(adapter, { merchants: [] });
    this.database.read();

    if (this.database.data == null) {
      this.database.data = { merchants: [] };
      this.database.write();
    } else {
      // Deserialize merchants into Merchant instances using the factory function
      this.database.data.merchants.forEach((m) =>
        this.addMerchant(
          this.createMerchant(m.id, m.name, m.profession, m.location),
        ),
      );
    }
  }

  addMerchant(newMerchant: Merchant): void {
    super.addMerchant(newMerchant);
    this.database.data.merchants = this.merchants;
    this.database.write();
  }

  removeMerchant(removeId: string): void {
    super.removeMerchant(removeId);
    this.database.data.merchants = this.merchants;
    this.database.write();
  }

  modifyMerchant(
    modifyId: string,
    parameter: keyof Merchant,
    newValue: string | Profession,
  ): void {
    super.modifyMerchant(modifyId, parameter, newValue);
    this.database.data.merchants = this.merchants;
    this.database.write();
  }
}
