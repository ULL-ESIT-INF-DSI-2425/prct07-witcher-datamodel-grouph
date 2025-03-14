export type Profession =
  | "Herrero"
  | "Alquimista"
  | "Mercader General"
  | "Carnicero"
  | "Druida"
  | "Contrabandista";

export class Merchant {
  constructor(
    private _id: number,
    private _name: string,
    private _profession: Profession,
    private _location: string,
  ) {
    this._id = _id + 20000;
  }

  get id() {
    return this._id
  }
  get name() {
    return this._name
  }
  get profession() {
    return this._profession
  }
  get location() {
    return this._location
  }

  set id(new_id: number) {
    this._id = new_id
  }
  set name(new_name: string) {
    this._name = new_name
  }
  set profession(new_profession: Profession) {
    this._profession = new_profession
  }
  set location(new_location: string) {
    this._location = new_location
  }
}
