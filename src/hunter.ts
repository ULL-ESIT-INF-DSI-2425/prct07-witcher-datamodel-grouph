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
    public readonly id: number,
    public readonly name: string,
    public readonly race: Race,
    public readonly location: string,
  ) {
    this.id = id + 30000;
  }
}
