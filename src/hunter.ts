export type Race =
  | "Human"
  | "Elf"
  | "Dwarf"
  | "Halfling"
  | "Warlock"
  | "Lycanthropic"
  | "Vran"
  | "Dryad"
  | "Spectral Cat"
  | "Half-Elf";

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

  set id(new_id: number) {
    this._id = new_id;
  }

  set name(new_name: string) {
    this._name = new_name;
  }

  set race(new_race: Race) {
    this._race = new_race;
  }

  set location(new_location: string) {
    this._location = new_location;
  }
}
