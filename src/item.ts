export type WeaponMaterial =
  | "Steel"
  | "Elven Steel"
  | "Meteoric Steel"
  | "Silver"
  | "Reinforced Silver"
  | "Ebony Wood"
  | "Monster Bone"
  | "Volcanic Glass"
  | "Mithril"
  | "Adamantite";

export type ArmorMaterial =
  | "Leather"
  | "Hardened Leather"
  | "Steel Mesh"
  | "Silver Mesh"
  | "Dragon Scales"
  | "Adamantite Plates"
  | "Mithril"
  | "Enchanted Fabric"
  | "Monster Bone"
  | "Insectoid Chitin";

export type PotionMaterial =
  | "Celandine Flower"
  | "Mandrake"
  | "Vervain"
  | "Bryonia Root"
  | "Crushed Kikimora Skull"
  | "Nekker Gland"
  | "Wraith Essence"
  | "Griffin Marrow"
  | "Endrega Mucus"
  | "Ghoul Blood";

export type GenericMaterial = ArmorMaterial | WeaponMaterial | PotionMaterial;

export type Effect =
  | "Vitality Regeneration"
  | "Night Vision"
  | "Poison Resistance"
  | "Strength Boost"
  | "Speed Boost"
  | "Increased Sign Damage"
  | "Toxicity Reduction"
  | "Invisible Creature Detection"
  | "Temporary Enemy Paralysis"
  | "Life Absorption";

export abstract class BaseItem {
  constructor(
    protected _id: string,
    protected _name: string,
    protected _description: string,
    protected _material: GenericMaterial,
    protected _weight: number,
    protected _price: number,
  ) {}

  // Public getters
  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get material(): GenericMaterial {
    return this._material;
  }

  get weight(): number {
    return this._weight;
  }

  get price(): number {
    return this._price;
  }

  // Public setters
  set id(newId: string) {
    this._id = newId;
  }

  set name(newName: string) {
    this._name = newName;
  }

  set description(newDescription: string) {
    this._description = newDescription;
  }

  set material(newMaterial: GenericMaterial) {
    this._material = newMaterial;
  }

  set weight(newWeight: number) {
    this._weight = newWeight;
  }

  set price(newPrice: number) {
    this._price = newPrice;
  }
}

export class Armor extends BaseItem {
  constructor(
    id: string,
    name: string,
    description: string,
    protected _material: ArmorMaterial,
    weight: number,
    price: number,
  ) {
    super(id, name, description, _material, weight, price);
  }

  get material(): ArmorMaterial {
    return this._material;
  }

  set material(newMaterial: ArmorMaterial) {
    this._material = newMaterial;
  }

  static createArmor(
    id: number,
    name: string,
    description: string,
    material: ArmorMaterial,
    weight: number,
    price: number,
  ): Armor {
    const prefixedId = `A-${id}`;
    return new Armor(prefixedId, name, description, material, weight, price);
  }
}

export class Weapon extends BaseItem {
  constructor(
    id: string,
    name: string,
    description: string,
    protected _material: WeaponMaterial,
    weight: number,
    price: number,
  ) {
    super(id, name, description, _material, weight, price);
  }

  get material(): WeaponMaterial {
    return this._material;
  }

  set material(newMaterial: WeaponMaterial) {
    this._material = newMaterial;
  }

  static createWeapon(
    id: number,
    name: string,
    description: string,
    material: WeaponMaterial,
    weight: number,
    price: number,
  ): Weapon {
    const prefixedId = `W-${id}`;
    return new Weapon(prefixedId, name, description, material, weight, price);
  }
}

export class Potion extends BaseItem {
  constructor(
    id: string,
    name: string,
    description: string,
    protected _material: PotionMaterial,
    weight: number,
    price: number,
    protected _effect: Effect,
  ) {
    super(id, name, description, _material, weight, price);
  }

  get material(): PotionMaterial {
    return this._material;
  }

  set material(newMaterial: PotionMaterial) {
    this._material = newMaterial;
  }

  get effect(): Effect {
    return this._effect;
  }

  set effect(newEffect: Effect) {
    this._effect = newEffect;
  }

  static createPotion(
    id: number,
    name: string,
    description: string,
    material: PotionMaterial,
    weight: number,
    price: number,
    effect: Effect,
  ): Potion {
    const prefixedId = `P-${id}`;
    return new Potion(
      prefixedId,
      name,
      description,
      material,
      weight,
      price,
      effect,
    );
  }
}

// Define the Item type as a union of Armor, Weapon, and Potion
export type Item = Armor | Weapon | Potion;
