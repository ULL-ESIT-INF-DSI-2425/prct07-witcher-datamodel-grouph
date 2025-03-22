import chalk from "chalk";
import inquirer from "inquirer";
import { displayTitle, pressEnterToContinue, showError } from "../utils/menuUtils.js";
import { goodsMenu, itemDB } from "./goodsMenu.js";
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
        return goodList();
      }

      switch (option) {
        case "list":
          return listAllItems();
        case "filterName":
          return filterName();
        case "filterType":
          return filterType();
        case "filterDescription":
          return filterDescription();
        case "sortName":
          itemDB.sortItemsByName();

          break;
        case "sortPrice":
          itemDB.sortItemsByPrice();

          break;
        default:
          showError("Invalid action");
      }
      pressEnterToContinue().then(() => {
        goodsMenu();
      });
    });
}

export function listAllItems(): void {
  displayTitle("List All Items");

  const items = itemDB.getAll();

  if (items.length === 0) {
    console.log(chalk.yellow("No items found."));
  } else {
    console.log(chalk.green("Available Items:"));

    const tableData = items.map((item) => ({
      ID: item.id,
      Name: item.name,
      Description: item.description,
      Material: item.material,
      Weight: item.weight,
      Price: item.price,
    }));

    console.table(tableData);
  }
  pressEnterToContinue().then(() => goodList());
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
      const filteredItems = itemDB.getItemsByName(answers.name);

      console.clear();
      displayTitle("Filtered Items");

      if (filteredItems.length === 0) {
        console.log(chalk.yellow("No items found with that name."));
      } else {
        console.log(chalk.green("Matching Items:"));
        console.table(
          filteredItems.map((item) => ({
            ID: item.id,
            Name: item.name,
            Description: item.description,
            Material: item.material,
            Weight: item.weight,
            Price: item.price,
          }))
        );
      }

      return pressEnterToContinue();
    })
    .then(() => goodList());
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
      const filteredItems = itemDB.getItemsByType(answers.type);

      console.clear();
      displayTitle("Filtered Items");

      if (filteredItems.length === 0) {
        console.log(chalk.yellow("No items found for this type."));
      } else {
        console.log(chalk.green("Matching Items:"));
        console.table(
          filteredItems.map((item) => ({
            ID: item.id,
            Name: item.name,
            Description: item.description,
            Material: item.material,
            Weight: item.weight,
            Price: item.price,
          }))
        );
      }

      return pressEnterToContinue();
    })
    .then(() => goodList());
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
      const filteredItems = itemDB.getItemsByDescription(answers.description);

      console.clear();
      displayTitle("Filtered Items");

      if (filteredItems.length === 0) {
        console.log(chalk.yellow("No items found with that description."));
      } else {
        console.log(chalk.green("Matching Items:"));
        console.table(
          filteredItems.map((item) => ({
            ID: item.id,
            Name: item.name,
            Description: item.description,
            Material: item.material,
            Weight: item.weight,
            Price: item.price,
          }))
        );
      }

      return pressEnterToContinue();
    })
    .then(() => goodList());
}
