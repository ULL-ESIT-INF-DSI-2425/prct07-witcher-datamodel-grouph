import { Merchant, Profession } from "../merchant.js";

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

  addMerchant(newMerchant: Merchant): void {
    if (this.merchants.some((m) => m.id === newMerchant.id)) {
      console.log(
        `/// WARNING: Merchant with ID ${newMerchant.id} already exists ///`,
      );
      return;
    }
    this.merchants.push(newMerchant);
  }

  removeMerchant(removeId: string): void {
    this.merchants = this.merchants.filter((m) => m.id !== removeId);
  }

  getMerchants(): Merchant[] {
    return this.merchants;
  }

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

  getMerchantBy(
    parameter: keyof Merchant,
    value: string | Profession,
  ): Merchant[] {
    return this.merchants.filter((m) => m[parameter] === value);
  }

  getMerchantById(id: string): Merchant | undefined {
    return this.merchants.find((m) => m.id === id);
  }

  getMerchantByName(name: string): Merchant[] | undefined {
    return this.merchants.filter((m) => m.name === name);
  }

  getMerchantByLocation(location: string): Merchant[] {
    return this.merchants.filter((m) => m.location === location);
  }

  getMerchantByProfession(profession: Profession): Merchant[] { 
    return this.merchants.filter((m) => m.profession === profession);
  }
}
