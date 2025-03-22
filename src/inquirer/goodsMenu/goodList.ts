import chalk from "chalk";
import inquirer from "inquirer";
import { displayTitle, pressEnterToContinue, showError } from "../utils/menuUtils.js";
import { goodsMenu } from "./goodsMenu.js";
import { JsonItemCollection } from "../../data/itemDB.js";

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
      const option = answers["option"];
      if (option === "back") {
        return goodsMenu();
      }

      switch (option) {
        case "list":
          // Utiliza el método getAllItems() para imprimir todos los items
          break;
        case "filterName":
          return filterName();
        case "filterType":
          return filterType();
        case "filterDescription":
          return filterDescription();
        case "sortName":
          // Ordena y muestra los items por nombre (ascendente)
          break;
        case "sortPrice":
          // Ordena y muestra los items por precio (ascendente)
          break;
        default:
          showError("Invalid action");
      }
      pressEnterToContinue().then(() => {
        goodList();
      });
    });
}

export function filterName(): void {
  displayTitle("Filter by Name");
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the name of the item to filter:",
      },
    ])
    .then((answers) => {
      
    });
}

export function filterType(): void {
  displayTitle("Filter by Type");
  inquirer
    .prompt([
      {
        type: "list",
        name: "type",
        message: "Select the type of the item:",
        choices: ["Armor", "Weapon", "Potion"],
      },
    ])
    .then((answers) => {
      
    });
}

export function filterDescription(): void {
  displayTitle("Filter by Description");
  inquirer
    .prompt([
      {
        type: "input",
        name: "description",
        message: "Enter a part of the description to filter:",
      },
    ])
    .then((answers) => {
      
    });
}
