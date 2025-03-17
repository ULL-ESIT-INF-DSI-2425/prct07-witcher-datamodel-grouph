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

export abstract class Item {
  constructor(
    protected _id: string,
    protected _name: string,
    protected _description: string,
    protected _material: GenericMaterial,
    protected _weight: number,
    protected _price: number,
  ) {}
  abstract get id(): string;
  abstract get name(): string;
  abstract get description(): string;
  abstract get material(): GenericMaterial;
  abstract get weight(): number;
  abstract get price(): number;

  abstract set id( new_id: string );
  abstract set name(new_name: string);
  abstract set description(new_description: string);
  abstract set material(new_material: GenericMaterial);
  abstract set weight(new_weight: number);
  abstract set price(new_price: number);
}

export class Armor extends Item {
  constructor(
    protected _id: string,
    protected _name: string,
    protected _description: string,
    protected _material: ArmorMaterial,
    protected _weight: number,
    protected _price: number,
  ) {
    super('A'+_id, _name, _description, _material, _weight, _price);
  }
  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get description(): string {
    return this._description;
  }
  get material(): ArmorMaterial {
    return this._material;
  }
  get weight(): number {
    return this._weight;
  }
  get price(): number {
    return this._price;
  }

  set id( new_id: string ) {
    this._id = new_id
  }
  set name(new_name: string) {
    this._name = new_name
  }
  set description(new_description: string) {
    this._description = new_description
  }
  set material(new_material: ArmorMaterial) {
    this._material = new_material
  }
  set weight(new_weight: number) {
    this._weight = new_weight
  }
  set price(new_price: number) {
    this._price = new_price
  }
}

export class Weapon extends Item {
  constructor(
    protected _id: string,
    protected _name: string,
    protected _description: string,
    protected _material: WeaponMaterial,
    protected _weight: number,
    protected _price: number,
  ) {
    super('W' + _id, _name, _description, _material, _weight, _price);
  }
  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get description(): string {
    return this._description;
  }
  get material(): WeaponMaterial {
    return this._material;
  }
  get weight(): number {
    return this._weight;
  }
  get price(): number {
    return this._price;
  }

  set id( new_id: string ) {
    this._id = new_id
  }
  set name(new_name: string) {
    this._name = new_name
  }
  set description(new_description: string) {
    this._description = new_description
  }
  set material(new_material: WeaponMaterial) {
    this._material = new_material
  }
  set weight(new_weight: number) {
    this._weight = new_weight
  }
  set price(new_price: number) {
    this._price = new_price
  }
}

export class Potion extends Item {
  constructor(
    protected _id: string,
    protected _name: string,
    protected _description: string,
    protected _material: PotionMaterial,
    protected _weight: number,
    protected _price: number,
    protected _effect: Effect,
  ) {
    super('P' + _id, _name, _description, _material, _weight, _price);
  }
  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get description(): string {
    return this._description;
  }
  get material(): PotionMaterial {
    return this._material;
  }
  get weight(): number {
    return this._weight;
  }
  get price(): number {
    return this._price;
  }
  get effect(): Effect {
    return this._effect
  }

  set id( new_id: string ) {
    this._id = new_id
  }
  set name(new_name: string) {
    this._name = new_name
  }
  set description(new_description: string) {
    this._description = new_description
  }
  set material(new_material: PotionMaterial) {
    this._material = new_material
  }
  set weight(new_weight: number) {
    this._weight = new_weight
  }
  set price(new_price: number) {
    this._price = new_price
  }
  set effect(new_effect: Effect) {
    this._effect = new_effect
  }

  // ALBERTO - Ayuda no entiendo el motivo de estos metodos, los añado por si acaso
  static createPotion(
    id: string,
    name: string,
    description: string,
    material: PotionMaterial,
    weight: number,
    price: number,
    effect: Effect
  ): Potion {
    const prefixedId = `P-${id}`;
    return new Potion(prefixedId, name, description, material, weight, price, effect)
  }

  static createWeapon(
    id: string,
    name: string,
    description: string,
    material: WeaponMaterial,
    weight: number,
    price: number
  ): Weapon {
    const prefixedId = `W-${id}`;
    return new Weapon(prefixedId, name, description, material, weight, price)
  }

  static createArmor(
    id: number,
    name: string,
    description: string,
    material: ArmorMaterial,
    weight: number,
    price: number
  ): Armor {
    const prefixedId = `A-${id}`;
    return new Armor(prefixedId, name, description, material, weight, price)
  }
}