import { Hunter, Race } from "../hunter.js";

/**
 * Class to manage a collection of clients
 */
export class ClientCollection {
  protected clients: Hunter[] = [];

  /**
   * Constructor for the ClientCollection class
   * @param createHunter - Function to create a new hunter
   */
  constructor(
    protected createHunter: (
      id: string,
      name: string,
      race: Race,
      location: string,
    ) => Hunter,
  ) {}

  /**
   * Method to add a new client to the collection
   * @param newHunter The new hunter to add
   * @returns void
   */
  addClient(newHunter: Hunter): void {
    if (this.clients.some((h) => h.id === newHunter.id)) {
      console.log(
        `/// WARNING: Hunter with ID ${newHunter.id} already exists ///`,
      );
      return;
    }
    this.clients.push(newHunter);
  }

  /**
   * Method to remove a client from the collection
   * @param removeId The id of the client to remove
   * @returns void
   */
  removeClient(removeId: string): void {
    this.clients = this.clients.filter((h) => h.id !== removeId);
  }

  /**
   * Method to get all clients
   * @returns All clients in the collection
   */
  getClients(): Hunter[] {
    return this.clients;
  }

  /**
   * Method to modify a client's information
   * @param modifyId The id of the client to modify
   * @param parameter The parameter to modify
   * @param newValue The new value for the parameter
   * @returns void
   */
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

  /**
   * Method to get a client by a specific parameter
   * @param parameter The parameter to search by
   * @param value The value to search for
   * @returns The client(s) that match the search
   */
  getClientBy(parameter: keyof Hunter, value: string | Race): Hunter[] {
    return this.clients.filter((h) => h[parameter] === value);
  }

  /**
   * Method to get a client by their id
   * @param id The id of the client to search for
   * @returns The client that matches the id
   */
  getClientById(id: string): Hunter | undefined {
    return this.clients.find((h) => h.id === id);
  }

  /**
   * Method to get a client by their name
   * @param name The name of the client to search for
   * @returns The client(s) that match the name
   */
  getClientByName(name: string): Hunter[] | undefined {
    return this.clients.filter((h) => h.name === name);
  }

  /**
   * Method to get a client by race
   * @param race The race of the client to search for
   * @returns The client(s) that match the race
   * @returns void
   */
  getClientByRace(race: Race): Hunter[] | undefined {
    return this.clients.filter((h) => h.race === race);
  }

  /**
   * Method to get a client by location
   * @param location The location of the client to search for
   * @returns The client(s) that match the location
   */
  getClientByLocation(location: string): Hunter[] | undefined {
    return this.clients.filter((h) => h.location === location);
  }
}
