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

  // /**
  //  * Method to get a merchant by a specific parameter
  //  * @param parameter The parameter to search by
  //  * @param value The value to search for
  //  * @returns All merchants that match the search criteria
  //  */
  // getMerchantBy(
  //   parameter: keyof Merchant,
  //   value: string | Profession,
  // ): Merchant[] {
  //   return this.merchants.filter((m) => m[parameter] === value);
  // }


  /**
   * Method to get a merchant by their id
   * @param id id of the merchant
   * @returns the merchant with the given id, or undefined if not found
   */
  getMerchantById(id: string): Merchant | undefined {
    return this.merchants.find((m) => m.id === id);
  }

  /**
   * Method to get a merchant by their name
   * @param name name of the merchant
   * @returns the merchant with the given name, or undefined if not found
   */
  getMerchantByName(name: string): Merchant[] | undefined {
    return this.merchants.filter((m) => m.name === name);
  }

  /**
   * Method to get a merchant by their profession
   * @param profession profession of the merchant
   * @returns the merchant with the given profession, or undefined if not found
   */
  getMerchantByLocation(location: string): Merchant[] {
    return this.merchants.filter((m) => m.location === location);
  }

  /**
   * Method to get a merchant by their profession
   * @param profession profession of the merchant
   * @returns the merchant with the given profession, or undefined if not found
   */
  getMerchantByProfession(profession: Profession): Merchant[] { 
    return this.merchants.filter((m) => m.profession === profession);
  }
}
