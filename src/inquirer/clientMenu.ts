import inquirer from "inquirer";
import chalk from "chalk";  
import { displayTitle, pressEnterToContinue, showError, showSuccess } from "./menuUtils.js";
import { mainMenu } from "./mainMenu.js";

export function clientMenu(): void {
  displayTitle("Manage Clients");
  inquirer
    .prompt([
      {
        type: "list",
        name: "option",
        message: chalk.white.underline("► Select an option:"),
        choices: [
          { name: chalk.green("Add Client"), value: "add" },
          { name: chalk.red("Delete Client"), value: "delete" },
          { name: chalk.blue("Update Client"), value: "update" },
          { name: chalk.magenta("List Clients"), value: "list" },
          new inquirer.Separator(),
          { name: chalk.yellow("↩ Return to Main Menu"), value: "back" },
        ],
      },
    ])
    .then(({ option }) => {
      if (option === "back") return mainMenu();

      switch (option) {
        case "add":
          return addClient();
        case "delete":
          return deleteClient();
        case "update":
          return updateClient();
        case "list":
          return listClients();
        default:
          showError("Invalid action");
      }
      pressEnterToContinue().then(() => clientMenu());
    });
}

export function addClient(): void {
  displayTitle("Add Client");
  inquirer
    .prompt([
      { type: "input", name: "name", message: "Enter the client's name:" },
      { type: "input", name: "race", message: "Enter the client's race:" },
      { type: "input", name: "address", message: "Enter the client's address:" },
    ])
    .then((answers) => {

      console.log(`✔ Client "${answers.name}" added successfully!`);
      pressEnterToContinue().then(() => clientMenu());
    });
}

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

export function listClients(): void {
  displayTitle("List Clients");
  console.log("List Clients function pending...");
  pressEnterToContinue().then(() => clientMenu());
}
