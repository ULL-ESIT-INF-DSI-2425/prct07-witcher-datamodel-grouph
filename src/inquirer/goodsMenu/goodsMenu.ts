import inquirer from "inquirer";
import chalk from "chalk";
import { clearConsole, displayTitle, pressEnterToContinue, showSuccess, showError } from "../utils/menuUtils.js";
import { mainMenu } from "../mainMenu.js";
import { JsonItemCollection } from "../../data/itemDB.js";

const itemCollection = new JsonItemCollection();

export function goodsMenu(): void {
  displayTitle("Manage Goods");
  inquirer
    .prompt([
      {
        type: "list",
        name: "option",
        message: chalk.white.underline("► Select an option:"),
        choices: [
          { name: chalk.green("Add Good"), value: "add" },
          { name: chalk.red("Delete Good"), value: "delete" },
          { name: chalk.blue("Update Good"), value: "update" },
          { name: chalk.magenta("Goods List"), value: "list" },
          new inquirer.Separator(),
          { name: chalk.yellow("↩ Return to Main Menu"), value: "back" },
        ],
      },
    ])
    .then((answers) => {
      const action = answers.option as string;
      if (action === "back") {
        return mainMenu();
      }
      switch (action) {
        case "add":
          return addGood();
        case "delete":
          return deleteGood();
        case "update":
          return updateGood(); // ← Corregido aquí
        case "list":
          return goodList();
          break;
        default:
          showError("Invalid action");
      }
      pressEnterToContinue().then(() => goodsMenu());
    });
}

export function addGood(): void {
  displayTitle("Add Good");
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the item's name:",
      },
      {
        type: "input",
        name: "description",
        message: "Enter the item's description:",
      },
      {
        type: "input",
        name: "material",
        message: "Enter the item's material:",
      },
      {
        type: "input",
        name: "weight",
        message: "Enter the item's weight:",
        validate: (input) => (!isNaN(parseFloat(input)) && parseFloat(input) > 0 ? true : "Weight must be a positive number"),
        filter: (input) => parseFloat(input),
      },
      {
        type: "input",
        name: "price",
        message: "Enter the item's price:",
        validate: (input) => (!isNaN(parseFloat(input)) && parseFloat(input) > 0 ? true : "Price must be a positive number"),
        filter: (input) => parseFloat(input),
      },
    ])
    .then((answers) => {
      console.log(`✔ Item "${answers.name}" added successfully!`);
      pressEnterToContinue().then(() => goodsMenu());
    });
}

export function deleteGood(): void {
  displayTitle("Delete Good");
  inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "Enter the item's ID:",
      },
    ])
    .then((answers) => {
      console.log(`✔ Item with ID ${answers.id} deleted successfully!`);
      pressEnterToContinue().then(() => goodsMenu());
    });
}

export function updateGood(): void {  // ← Renombrado correctamente
  displayTitle("Update Good");
  inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "Enter the item's ID:",
      },
    ])
    .then((answers) => {
      console.log("Update function pending...");
      inquirer
        .prompt([
          {
            type: "list",
            name: "field",
            message: "Select the field to update:",
            choices: [
              { name: "Name", value: "name" },
              { name: "Description", value: "description" },
              { name: "Material", value: "material" },
              { name: "Weight", value: "weight" },
              { name: "Price", value: "price" },
            ],
            loop: false,
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
                  if (field === "weight" || field === "price") {
                    return !isNaN(parseFloat(input)) && parseFloat(input) > 0 ? true : `${field} must be a positive number`;
                  }
                  return input.trim().length > 0 ? true : "This field cannot be empty";
                },
                filter: (input) => (field === "weight" || field === "price" ? parseFloat(input) : input),
              },
            ])
            .then((answers) => {
              showSuccess(`✔ Item ${field} updated successfully!`);
              pressEnterToContinue().then(() => goodsMenu());
            });
        });
    });
}

export function goodList(): void {
  displayTitle("Goods List Menu");
  inquirer
    .prompt([
      {
        type: "list",
        name: "option",
        message: chalk.white.underline("► Select an option:"),
        choices: [
          { name: chalk.magenta("List All Items"), value: "list" },
          { name: chalk.blue("Filter by Name"), value: "filterName" },
          { name: chalk.blue("Filter by Type"), value: "filterType" },
          { name: chalk.blue("Filter by Description"), value: "filterDescription" },
          { name: chalk.white("Sort by Name"), value: "sortName" },
          { name: chalk.white("Sort by Price"), value: "sortPrice" },
          new inquirer.Separator(),
          { name: chalk.yellow("↩ Return to Goods Menu"), value: "back" },
        ],
        loop: false,
      },
    ])
    .then((answers) => {
      const action = answers["option"] as string;
      if (action === "back") {
        return goodsMenu();
      }
      switch (action) {
        case "list":
          itemCollection.getAllItems();
          break;
        case "filterName":
          itemCollection.getItemsByName("Cat Potion");
          break;
        case "filterType":
          itemCollection.getItemsByType("Potion");
          break;
        case "filerDescription":
          
          break;
        case "sortName":
          itemCollection.sortItemsByName();
          break;

        case "sortPrice":
          
          break;
        default:
          showError("Invalid action");
      }
      pressEnterToContinue().then(() => goodsMenu());
    });
}