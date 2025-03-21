import inquirer from "inquirer";
import { displayTitle, pressEnterToContinue, showSuccess } from "../utils/menuUtils.js";
import { clientMenu } from "./clientMenu.js";

export function updateClient(): void {
  displayTitle("Update Client");
  inquirer
    .prompt([
      { type: "input", name: "id", message: "Enter the client's ID:" },
    ])
    .then(({ id }) => {
      inquirer
        .prompt([
          {
            type: "list",
            name: "field",
            message: "Select the field to update:",
            choices: [
              { name: "Name", value: "name" },
              { name: "Race", value: "race" },
              { name: "Address", value: "address" },
            ],
          },
        ])
        .then(({ field }) => {
          inquirer
            .prompt([
              { type: "input", name: "value", message: `Enter the new ${field}:` },
            ])
            .then(({ value }) => {
              showSuccess(`✔ Client ${field} updated successfully!`);
              pressEnterToContinue().then(() => clientMenu());
            });
        });
    });
}