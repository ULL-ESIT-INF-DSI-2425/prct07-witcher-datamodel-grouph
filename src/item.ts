export type WeaponMaterial =
  | "Acero"
  | "Acero élfico"
  | "Acero meteorítico"
  | "Plata"
  | "Plata reforzada"
  | "Madera de ébano"
  | "Hueso de monstruo"
  | "Vidrio volcánico"
  | "Mithril"
  | "Adamantita";

export type ArmorMaterial =
  | "Cuero"
  | "Cuero endurecido"
  | "Malla de acero"
  | "Malla de plata"
  | "Escamas de dragón"
  | "Placas de adamantita"
  | "Mithril"
  | "Tela encantada"
  | "Hueso de monstruo"
  | "Chitin de insectoide";

export type PotionMaterial =
  | "Flor de celandina"
  | "Mandrágora"
  | "Vérvain"
  | "Raíz de bryonia"
  | "Cráneo de kikimora triturado"
  | "Glándula de nekkers"
  | "Esencia de espectro"
  | "Médula de grifo"
  | "Mucosidad de endriaga"
  | "Sangre de ghoul";

export type GenericMaterial = ArmorMaterial | WeaponMaterial | PotionMaterial;

export type Effect =
  | "Regeneración de vitalidad"
  | "Visión en la oscuridad"
  | "Resistencia al veneno"
  | "Aumento de fuerza"
  | "Aumento de velocidad"
  | "Aumento de daño con señales"
  | "Reducción de toxicidad"
  | "Detección de seres invisibles"
  | "Parálisis temporal de enemigos"
  | "Absorción de vida";

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