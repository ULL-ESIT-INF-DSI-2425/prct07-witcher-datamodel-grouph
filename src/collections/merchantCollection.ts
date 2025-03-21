import { Merchant, Profession } from "../merchant.js";

/**
 * Class to manage a collection of merchants
 */
export class MerchantCollection {
  protected merchants: Merchant[] = [];

  constructor(
    protected createMerchant: (
      id: string,
      name: string,
      profession: Profession,
      location: string,
    ) => Merchant,
  ) {}

  /**
   * Method to add a new merchant to the collection
   * @param newMerchant The new merchant to add
   * @returns void
   */
  addMerchant(newMerchant: Merchant): void {
    if (this.merchants.some((m) => m.id === newMerchant.id)) {
      console.log(
        `/// WARNING: Merchant with ID ${newMerchant.id} already exists ///`,
      );
      return;
    }
    this.merchants.push(newMerchant);
  }

  /**
   * Method to remove a merchant from the collection
   * @param removeId The id of the merchant to remove
   * @returns void
   */
  removeMerchant(removeId: string): void {
    this.merchants = this.merchants.filter((m) => m.id !== removeId);
  }

  /**
   * Method to get all merchants
   * @returns All merchants in the collection
   */
  getMerchants(): Merchant[] {
    this.printFormatted("All Merchants", this.merchants);
    return this.merchants;
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
    const merchant = this.merchants.find((m) => m.id === modifyId);
    if (merchant) {
      merchant[parameter] = newValue as never;
    } else {
      console.log(`/// WARNING: Merchant with ID ${modifyId} not found ///`);
    }
  }

  /**
   * Method to get a merchant by their id
   * @param id id of the merchant
   * @returns the merchant with the given id, or undefined if not found
   */
  getMerchantById(id: string): Merchant | undefined {
    const result = this.merchants.find((m) => m.id === id);
    if (result) {
      this.printFormatted(`Merchant with ID "${id}"`, [result]);
    } else {
      console.log(`No merchant found with ID "${id}"`);
    }
    return result;
  }

  /**
   * Method to get a merchant by their name
   * @param name name of the merchant
   * @returns the merchant(s) with the given name, or an empty array if not found
   */
  getMerchantByName(name: string): Merchant[] {
    const result = this.merchants.filter((m) => m.name === name);
    this.printFormatted(`Merchants with name "${name}"`, result);
    return result;
  }

  /**
   * Method to get merchants by their location
   * @param location location of the merchant
   * @returns the merchant(s) that match the location
   */
  getMerchantByLocation(location: string): Merchant[] {
    const result = this.merchants.filter((m) => m.location === location);
    this.printFormatted(`Merchants in location "${location}"`, result);
    return result;
  }

  /**
   * Method to get merchants by their profession
   * @param profession profession of the merchant
   * @returns the merchant(s) that match the profession
   */
  getMerchantByProfession(profession: Profession): Merchant[] { 
    const result = this.merchants.filter((m) => m.profession === profession);
    this.printFormatted(`Merchants with profession "${profession}"`, result);
    return result;
  }

  /**
   * Private method to print an array of merchants in a formatted table.
   * @param title Title of the printed output.
   * @param merchants Array of merchants to print.
   */
  private printFormatted(title: string, merchants: Merchant[]): void {
    console.log(`\n=== ${title} ===`);
    if (merchants.length === 0) {
      console.log("No merchants found.");
    } else {
      console.table(
        merchants.map((m) => ({
          ID: m.id,
          Name: m.name,
          Profession: m.profession,
          Location: m.location,
        }))
      );
    }
  }
}
