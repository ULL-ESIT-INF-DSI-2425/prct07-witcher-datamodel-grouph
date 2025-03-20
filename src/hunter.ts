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
    protected _id: string,
    protected _name: string,
    protected _race: Race,
    protected _location: string,
  ) {}

  // Public getters
  get id(): string {
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

  // Public setters
  set id(newId: string) {
    this._id = newId;
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

  // Static method to create a Hunter with a prefixed ID
  static createHunter(
    id: number,
    name: string,
    race: Race,
    location: string,
  ): Hunter {
    const prefixedId = `H-${id}`;
    return new Hunter(prefixedId, name, race, location);
  }
}
