export type Profession =
  | "Herrero"
  | "Alquimista"
  | "Mercader General"
  | "Carnicero"
  | "Druida"
  | "Contrabandista";

export class Merchant {
  constructor(
    protected _id: string,
    protected _name: string,
    protected _profession: Profession,
    protected _location: string,
  ) {}

  // Public getters
  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get profession(): Profession {
    return this._profession;
  }

  get location(): string {
    return this._location;
  }

  // Public setters
  set id(newId: string) {
    this._id = newId;
  }

  set name(newName: string) {
    this._name = newName;
  }

  set profession(newProfession: Profession) {
    this._profession = newProfession;
  }

  set location(newLocation: string) {
    this._location = newLocation;
  }

  // Static method to create a Merchant with a prefixed ID
  static createMerchant(
    id: number,
    name: string,
    profession: Profession,
    location: string,
  ): Merchant {
    const prefixedId = `M-${id}`;
    return new Merchant(prefixedId, name, profession, location);
  }
}
