import inquirer from "inquirer";
import { displayTitle, pressEnterToContinue } from "../utils/menuUtils.js";
import { clientMenu } from "./clientMenu.js";

export function deleteClient(): void {
  displayTitle("Delete Client");
  inquirer
    .prompt([
      { type: "input", name: "id", message: "Enter the client's ID:" },
    ])
    .then(({ id }) => {
      console.log(`✔ Client with ID ${id} deleted successfully!`);
      pressEnterToContinue().then(() => clientMenu());
    });
}