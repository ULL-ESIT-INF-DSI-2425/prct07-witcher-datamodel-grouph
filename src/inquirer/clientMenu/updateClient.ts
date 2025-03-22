import inquirer from "inquirer";
import {
  displayTitle,
  pressEnterToContinue,
  showSuccess,
} from "../utils/menuUtils.js";
import { clientMenu, clientDB, validRaces } from "./clientMenu.js";
import { Race } from "../../hunter.js";

export function updateClient(): void {
  displayTitle("Update Client");

  // Solicitar ID del cliente a modificar
  inquirer
    .prompt([{ type: "input", name: "id", message: "Enter the client's ID:" }])
    .then(({ id }) => {
      // Preguntar cuál campo se desea actualizar
      inquirer
        .prompt([
          {
            type: "list",
            name: "field",
            message: "Select the field to update:",
            choices: [
              { name: "Name", value: "name" },
              { name: "Race", value: "race" },
              { name: "Address", value: "location" },
            ],
          },
        ])
        .then(({ field }) => {
          inquirer
            .prompt([
              {
                type: "input",
                name: "value",
                message: `Enter the new ${field}:`,
                validate: (input) => {
                  const trimmedInput = input.trim() as Race;
                  if (field === "race") {
                    return validRaces.includes(trimmedInput)
                      ? true
                      : `Invalid race. Choose from: ${validRaces.join(", ")}.`;
                  }
                  return true;
                },
              },
            ])
            .then(({ value }) => {
              clientDB.modifyClient(id, field, value);
              showSuccess(`Client ${field} updated successfully!`);
              pressEnterToContinue().then(() => clientMenu());
            });
        });
    });
}
