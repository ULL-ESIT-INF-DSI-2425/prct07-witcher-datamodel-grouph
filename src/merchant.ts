export type Profession =
  | "Herrero"
  | "Alquimista"
  | "Mercader General"
  | "Carnicero"
  | "Druida"
  | "Contrabandista";

export class Merchant {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly profession: Profession,
    public readonly location: string,
  ) {
    this.id = id + 20000;
  }
}
