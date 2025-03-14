export type Race =
  | "Humano"
  | "Elfo"
  | "Enano"
  | "Mediano"
  | "Brujo"
  | "Licantrópico"
  | "Vran"
  | "Dríada"
  | "Gato espectral"
  | "Semielfo";

export class Hunter {
  constructor(
    protected _id: number,
    protected _name: string,
    protected _race: Race,
    protected _location: string,
  ) {
    this._id = _id + 30000;
  }

  get hunter(): Hunter {
    return this;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get race(): Race {
    return this._race;
  }

  get location(): string {
    return this._location;
  }

  set id(newID: number) {
    this._id = newID;
  }

  set name(newName: string) {
    this._name = newName;
  }

  set race(newRace: Race) {
    this._race = newRace;
  }

  set location(newLocation: string) {
    this._location = newLocation;
  }
}
