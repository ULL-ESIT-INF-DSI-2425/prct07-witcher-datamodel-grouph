import { Armor, Weapon, Potion, ArmorMaterial, WeaponMaterial, PotionMaterial, Effect } from "./item.js";

export class ItemCollection {
    protected _weapons: {weapon: Weapon, amount: number}[];
    protected _armors: {armor: Armor, amount: number}[];
    protected _potions: {potion: Potion, amount: number}[];

    constructor() {
        this._weapons = [];
        this._armors = [];
        this._potions = [];
    }

    addWeapon(newWeapon: Weapon): void {
        // Check if the weapon already exists
        let weapon = this._weapons.find((w) => w.weapon.id === newWeapon.id);
        if (weapon) {
            weapon.amount++;
            return;
        }
        this._weapons.push({weapon: newWeapon, amount: 1});
    }

    addArmor(newArmor: Armor): void {
        let armor = this._armors.find((a) => a.armor.id === newArmor.id);
        if (armor) {
            armor.amount++;
            return;
        }
        this._armors.push({armor: newArmor, amount: 1});
    }

    addPotion(newPotion: Potion): void {
        let potion = this._potions.find((p) => p.potion.id === newPotion.id);
        if (potion) {
            potion.amount++;
            return;
        }
        this._potions.push({potion: newPotion, amount: 1});
    }

    subtractWeapon(subtractId: string): void {
        let weapon = this._weapons.find((w) => w.weapon.id === subtractId);
        if (weapon) {
            weapon.amount--;
            if (weapon.amount === 0) {
                this._weapons = this._weapons.filter((w) => w.weapon.id !== subtractId);
            }
        } else {
            console.log(`/// WARNING: Weapon with ID ${subtractId} not found ///`);
        }
    }

    subtractArmor(subtractId: string): void {
        let armor = this._armors.find((a) => a.armor.id === subtractId);
        if (armor) {
            armor.amount--;
            if (armor.amount === 0) {
                this._armors = this._armors.filter((a) => a.armor.id !== subtractId);
            }
        } else {
            console.log(`/// WARNING: Armor with ID ${subtractId} not found ///`);
        }
    }

    subtractPotion(subtractId: string): void {
        let potion = this._potions.find((p) => p.potion.id === subtractId);
        if (potion) {
            potion.amount--;
            if (potion.amount === 0) {
                this._potions = this._potions.filter((p) => p.potion.id !== subtractId);
            }
        } else {
            console.log(`/// WARNING: Potion with ID ${subtractId} not found ///`);
        }
    }

    get weapons() {
        return this._weapons;
    }

    get armors() {
        return this._armors;
    }

    get potions() {
        return this._potions;
    }

    modifyWeapon(modifyId: string, parameter: keyof Weapon, newValue: string | number): void {
        const weapon = this.weapons.find((w) => w.weapon.id === modifyId);
        if (weapon) {
            weapon.weapon[parameter] = newValue as never;
        } else {
            console.log(`/// WARNING: Weapon with ID ${modifyId} not found ///`);
        }
    }

    modifyArmor(modifyId: string, parameter: keyof Armor, newValue: string | number): void {
        const armor = this.armors.find((a) => a.armor.id === modifyId);
        if (armor) {
            armor.armor[parameter] = newValue as never;
        } else {
            console.log(`/// WARNING: Armor with ID ${modifyId} not found ///`);
        }
    }

    modifyPotion(modifyId: string, parameter: keyof Potion, newValue: string | number): void {
        const potion = this.potions.find((p) => p.potion.id === modifyId);
        if (potion) {
            potion.potion[parameter] = newValue as never;
        } else {
            console.log(`/// WARNING: Potion with ID ${modifyId} not found ///`);
        }
    }

    getWeaponBy(parameter: keyof Weapon, value: string | number | Weapon): {weapon: Weapon, amount: number}[] {
        let result: {weapon: Weapon, amount: number}[] = []
        this.weapons.forEach((w) => {
            if (w.weapon[parameter] === value) {
                result.push(w);
            }
        });
        return result;
    }

    getArmorBy(parameter: keyof Armor, value: string | number | ArmorMaterial): {armor: Armor, amount: number}[] {
        let result: {armor: Armor, amount: number}[] = []
        this.armors.forEach((a) => {
            if (a.armor[parameter] === value) {
                result.push(a);
            }
        });
        return result;
    }

    getPotionBy(parameter: keyof Potion, value: string | number | PotionMaterial | Effect): {potion: Potion, amount: number}[] {
        let result: {potion: Potion, amount: number}[] = []
        this.potions.forEach((p) => {
            if (p.potion[parameter] === value) {
                result.push(p);
            }
        });
        return result;
    }

}
