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
    protected id: number,
    protected name: string,
    protected description: string,
    protected material: GenericMaterial,
    protected weight: number,
    protected price: number,
  ) {}
  abstract getID(): number;
  abstract getName(): string;
  abstract getDescription(): string;
  abstract getMaterial(): GenericMaterial;
  abstract getWeight(): number;
  abstract getPrice(): number;
}

export class Armor extends Item {
  constructor(
    protected id: number,
    protected name: string,
    protected description: string,
    protected material: ArmorMaterial,
    protected weight: number,
    protected price: number,
  ) {
    super(10000 + id, name, description, material, weight, price);
  }
  getID(): number {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getDescription(): string {
    return this.description;
  }
  getMaterial(): ArmorMaterial {
    return this.material;
  }
  getWeight(): number {
    return this.weight;
  }
  getPrice(): number {
    return this.price;
  }
}

export class Weapon extends Item {
  constructor(
    protected id: number,
    protected name: string,
    protected description: string,
    protected material: WeaponMaterial,
    protected weight: number,
    protected price: number,
  ) {
    super(11000 + id, name, description, material, weight, price);
  }
  getID(): number {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getDescription(): string {
    return this.description;
  }
  getMaterial(): WeaponMaterial {
    return this.material;
  }
  getWeight(): number {
    return this.weight;
  }
  getPrice(): number {
    return this.price;
  }
}

export class Potion extends Item {
  constructor(
    protected id: number,
    protected name: string,
    protected description: string,
    protected material: PotionMaterial,
    protected weight: number,
    protected price: number,
    protected effect: Effect,
  ) {
    super(12000 + id, name, description, material, weight, price);
  }
  getID(): number {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getDescription(): string {
    return this.description;
  }
  getMaterial(): PotionMaterial {
    return this.material;
  }
  getWeight(): number {
    return this.weight;
  }
  getPrice(): number {
    return this.price;
  }
  getEffect(): Effect {
    return this.effect;
  }
}