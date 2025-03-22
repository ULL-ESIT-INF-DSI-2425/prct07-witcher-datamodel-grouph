import chalk from "chalk";
import { displayTitle, pressEnterToContinue } from "../utils/menuUtils.js";
import { clientMenu, clientDB } from "./clientMenu.js";
import { Hunter } from "../../hunter.js"; // Asegúrate de que la ruta sea correcta

export function listClients(): void {
  displayTitle("List Clients");

  const clients: Hunter[] = clientDB.getClients();

  if (clients.length === 0) {
    console.log(chalk.yellow("No clients found."));
  } else {
    console.log(chalk.green("Clients:"));

    // Preparamos los datos para la tabla
    const tableData = clients.map((client) => ({
      ID: client.id,
      Name: client.name,
      Race: client.race,
      Location: client.location,
    }));

    // Muestra la tabla en la consola
    console.table(tableData);
  }

  pressEnterToContinue().then(() => clientMenu());
}
