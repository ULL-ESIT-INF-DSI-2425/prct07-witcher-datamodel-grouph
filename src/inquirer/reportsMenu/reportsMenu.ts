// src/inquirer/reportsMenu.ts
import inquirer from "inquirer";
import chalk from "chalk";
import {
  displayTitle,
  pressEnterToContinue,
  showError,
} from "../utils/menuUtils.js";
import { mainMenu } from "../mainMenu.js";
import { historyMenu } from "./historyMenu.js";
import { stockMenu } from "./stockMenu.js";
import { topSelling } from "./topSelling.js";
import { financials } from "./financials.js";
import { Inventory } from "../../inventory.js";

export function reportsMenu(): void {
  displayTitle("Generate Reports");
  inquirer
    .prompt([
      {
        type: "list",
        name: "option",
        message: chalk.white.underline("► Select an option:"),
        choices: [
          { name: chalk.blue("Inventory Status"), value: "stock" },
          { name: chalk.green("Top Selling Items"), value: "topselling" },
          { name: chalk.yellow("Total Income & Expenses"), value: "financials"},
          { name: chalk.magenta("Transaction History"), value: "history" },
          new inquirer.Separator(),
          { name: chalk.yellow("↩ Return to Main Menu"), value: "back" },
        ],
      },
    ])
    .then((answers) => {
      const action = answers["option"] as string;
      if (action === "back") {
        return mainMenu();
      }
      switch (action) {
        case "stock":
          return stockMenu();
        case "topselling":
          return topSelling();
        case "financials":
          return financials();
        case "history":
          return historyMenu();
        default:
          showError("Invalid action");
      }
      pressEnterToContinue().then(() => reportsMenu());
    });
}
