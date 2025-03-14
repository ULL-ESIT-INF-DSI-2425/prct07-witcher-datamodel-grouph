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
    protected id: number,
    protected name: string,
    protected race: Race,
    protected location: string,
  ) {
    this.id = id + 30000;
  }

  get hunter(): Hunter {
    return this;
  }

  getID(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getRace(): Race {
    return this.race;
  }

  getLocation(): string {
    return this.location;
  }

  setID(newID: number) {
    this.id = newID;
  }

  setName(newName: string) {
    this.name = newName;
  }

  setRace(newRace: Race) {
    this.race = newRace;
  }

  setLocation(newLocation: string) {
    this.location = newLocation;
  }
}
