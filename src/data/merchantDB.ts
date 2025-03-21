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

    // Initialize the database if it's empty or invalid
    if (!this.database.data || !Array.isArray(this.database.data.merchants)) {
      this.database.data = { merchants: [] };
      this.database.write();
    }

    // Deserialize merchants into Merchant instances using the factory function
    this.database.data.merchants.forEach((m) => {
      if (m.id && m.name && m.profession && m.location) {
        const merchant = this.createMerchant(
          m.id,
          m.name,
          m.profession,
          m.location,
        );
        this.addMerchant(merchant);
      } else {
        console.warn("Skipping invalid merchant data:", m);
      }
    });
  }

  /**
   * Method to add a new merchant to the collection
   * @param newMerchant The new merchant to add
   * @returns void
   */
  addMerchant(newMerchant: Merchant): void {
    if (
      !newMerchant.id ||
      !newMerchant.name ||
      !newMerchant.profession ||
      !newMerchant.location
    ) {
      console.warn("Skipping invalid merchant:", newMerchant);
      return;
    }

    // Check if the merchant already exists
    const existingMerchant = this.merchants.find(
      (merchant) => merchant.id === newMerchant.id,
    );
    if (existingMerchant) {
      console.warn(`Merchant with id ${newMerchant.id} already exists.`);
      return;
    }

    super.addMerchant(newMerchant);
    this.database.data.merchants = this.merchants;
    this.database.write();
    console.log(`Added merchant: ${newMerchant.name}`);
  }

  /**
   * Method to remove a merchant from the collection
   * @param removeId The id of the merchant to remove
   * @returns void
   */
  removeMerchant(removeId: string): void {
    super.removeMerchant(removeId);
    this.database.data.merchants = this.merchants;
    this.database.write();
    console.log(`Removed merchant with id: ${removeId}`);
  }

  /**
   * Method to modify a merchant's information
   * @param modifyId The id of the merchant to modify
   * @param parameter The parameter to modify
   * @param newValue The new value for the parameter
   * @returns void
   */
  modifyMerchant(
    modifyId: string,
    parameter: keyof Merchant,
    newValue: string | Profession,
  ): void {
    super.modifyMerchant(modifyId, parameter, newValue);
    this.database.data.merchants = this.merchants;
    this.database.write();
    console.log(`Modified merchant with id: ${modifyId}`);
  }
}
