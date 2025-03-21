import inquirer from "inquirer";
import { displayTitle, pressEnterToContinue } from "../utils/menuUtils.js";
import { clientDB, clientMenu } from "./clientMenu.js";

export function deleteClient(): void {
  displayTitle("Delete Client");
  inquirer
    .prompt([{ type: "input", name: "id", message: "Enter the client's ID:" }])
    .then(({ id }) => {
      if (!clientDB.getClientById(id)) {
        console.log("Client not found.");
        pressEnterToContinue().then(() => clientMenu());
        return;
      }
      clientDB.removeClient(id);

      console.log(`Client with ID ${id} deleted successfully!`);
      pressEnterToContinue().then(() => clientMenu());
    });
}
