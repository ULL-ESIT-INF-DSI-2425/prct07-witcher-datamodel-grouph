import { Hunter, Race } from "../hunter.js";

export class ClientCollection {
  protected clients: Hunter[] = [];

  constructor(
    protected createHunter: (
      id: string,
      name: string,
      race: Race,
      location: string,
    ) => Hunter,
  ) {}

  addClient(newHunter: Hunter): void {
    if (this.clients.some((h) => h.id === newHunter.id)) {
      console.log(
        `/// WARNING: Hunter with ID ${newHunter.id} already exists ///`,
      );
      return;
    }
    this.clients.push(newHunter);
  }

  removeClient(removeId: string): void {
    this.clients = this.clients.filter((h) => h.id !== removeId);
  }

  getClients(): Hunter[] {
    return this.clients;
  }

  modifyClient(
    modifyId: string,
    parameter: keyof Hunter,
    newValue: string | Race,
  ): void {
    const hunter = this.clients.find((h) => h.id === modifyId);
    if (hunter) {
      hunter[parameter] = newValue as never;
    } else {
      console.log(`/// WARNING: Hunter with ID ${modifyId} not found ///`);
    }
  }

  getClientBy(parameter: keyof Hunter, value: string | Race): Hunter[] {
    return this.clients.filter((h) => h[parameter] === value);
  }

  getClientById(id: string): Hunter | undefined {
    return this.clients.find((h) => h.id === id);
  }
  getClientByName(name: string): Hunter[] | undefined {
    return this.clients.filter((h) => h.name === name);
  }
  getClientByRace(race: Race): Hunter[] | undefined {
    return this.clients.filter((h) => h.race === race);
  }
  getClientByLocation(location: string): Hunter[] | undefined {
    return this.clients.filter((h) => h.location === location);
  }
}
