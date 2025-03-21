import inquirer from "inquirer";
import chalk from "chalk";

import { clearConsole, displayTitle, pressEnterToContinue, showError, showSuccess } from "./menuUtils.js";
import { mainMenu } from "./mainMenu.js";

export function merchantMenu(): void {
  displayTitle("Manage Merchants");
  inquirer
    .prompt([
      {
        type: "list",
        name: "option",
        message: chalk.white.underline("► Select an option:"),
        choices: [
          { name: chalk.green("Add Merchant"), value: "add" },
          { name: chalk.red("Delete Merchant"), value: "delete" },
          { name: chalk.blue("Update Merchant"), value: "update" },
          { name: chalk.magenta("List Merchants"), value: "list" },
          new inquirer.Separator(),
          { name: chalk.yellow("↩ Return to Main Menu"), value: "back" },
        ],
      },
    ])
    .then((answers) => {
      const action = answers["option"] as string;
      if (action === "back") return mainMenu();

      switch (action) {
        case "add":
          return addMerchant();
        case "delete":
          return deleteMerchant();
        case "update":
          return updateMerchant();
        case "list":
          console.log("List Merchants function pending...");
          return pressEnterToContinue().then(() => merchantMenu());
        default:
          showError("Invalid action");
          return merchantMenu();
      }
    });
}

export function addMerchant(): void {
  displayTitle("Add Merchant");
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the Merchant's name:",
      },
      {
        type: "input",
        name: "profession",
        message: "Enter the Merchant's profession:",
      },
      {
        type: "input",
        name: "address",
        message: "Enter the Merchant's address:",
      },
    ])
    .then((answers) => {
      // AQUI VA EL CODIGO PARA AGREGAR EL MERCHANT A LA BASE DE DATOS
      console.log("Add Merchant function pending...");
      pressEnterToContinue().then(() => merchantMenu());
    });
}

export function deleteMerchant(): void {
  displayTitle("Delete Merchant");
  inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "Enter the Merchant's ID:",
      },
    ])
    .then((answers) => {
      // AQUI VA EL CODIGO PARA ELIMINAR EL MERCHANT DE LA BASE DE DATOS
      console.log("Delete Merchant function pending...");
      pressEnterToContinue().then(() => merchantMenu());
    });
}

export function updateMerchant(): void {
  displayTitle("Update Merchant");
  inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "Enter the Merchant's ID:",
      },
    ])
    .then((answers) => {
      // AQUI VA EL CODIGO PARA VER SI EL MERCHANT EXISTE Y LUEGO ACTUALIZARLO
      console.log("Update Merchant function pending...");
      inquirer
        .prompt([
          {
            type: "list",
            name: "field",
            message: "Select the field to update:",
            choices: [
              { name: "Name", value: "name" },
              { name: "Profession", value: "profession" },
              { name: "Address", value: "address" },
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
              },
            ])
            .then((answers) => {
              // AQUI VA EL CODIGO PARA ACTUALIZAR EL MERCHANT
              showSuccess(`\nMerchant ${field} updated successfully!\n`);
              pressEnterToContinue().then(() => merchantMenu());
            });
        });
    });
}