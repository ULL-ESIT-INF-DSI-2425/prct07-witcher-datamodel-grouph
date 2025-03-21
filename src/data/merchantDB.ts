import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import { Merchant, Profession } from "../merchant.js";
import { MerchantCollection } from "../collections/merchantCollection.js";

/**
 * Schema for the merchant database
 */
type MerchantDataBaseSchema = { merchants: Merchant[] };

/**
 * Class to manage a collection of merchants
 */
export class JsonMerchantCollection extends MerchantCollection {
  private database: LowSync<MerchantDataBaseSchema>;

  /**
   * Constructor for the JsonMerchantCollection class
   */
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

  /**
   * Method to get all merchants
   * @returns All merchants in the collection
   */
  addMerchant(newMerchant: Merchant): void {
    super.addMerchant(newMerchant);
    this.database.data.merchants = this.merchants;
    this.database.write();
  }

  /**
   * Method to add a new merchant to the collection
   * @param newMerchant The new merchant to add
   * @returns void
   */
  removeMerchant(removeId: string): void {
    super.removeMerchant(removeId);
    this.database.data.merchants = this.merchants;
    this.database.write();
  }

  /**
   * Method to modify a merchant's information
   * @param modifyId The id of the merchant to modify
   * @param parameter The parameter to modify
   * @param newValue The new value for the parameter
   * @returns
   */
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
