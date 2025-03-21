// src/inquirer/reportsMenu.ts
import inquirer from "inquirer";
import chalk from "chalk";
import { clearConsole, displayTitle, pressEnterToContinue, showError } from "./menuUtils.js";
import { mainMenu } from "./mainMenu.js";

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
          { name: chalk.yellow("Total Income & Expenses"), value: "financials" },
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
          stockMenu();
          break;
        case "topselling":
          console.log("Top Selling Items function pending...");
          break;
        case "financials":
          console.log("Total Income & Expenses function pending...");
          break;
        case "history":
          historyMenu();
          break;
        default:
          showError("Invalid action");
      }
      pressEnterToContinue().then(() => reportsMenu());
    });
}

/**
 * Function to display the Stock Menu
 */
export function stockMenu(): void {
  displayTitle("Inventory Status");
  inquirer
    .prompt([
      {
        type: "list",
        name: "option",
        message: chalk.white.underline("► Select an option:"),
        choices: [
          { name: chalk.green("List All Stock"), value: "list" },
          { name: chalk.blue("Filter by Type"), value: "filterType" },
          { name: chalk.red("Filter by Specific Item"), value: "filterSpecific" },
          new inquirer.Separator(),
          { name: chalk.yellow("↩ Return to Reports Menu"), value: "back" },
        ],
      },
    ])
    .then((answers) => {
      const action = answers["option"] as string;
      if (action === "back") {
        return reportsMenu();
      }
      switch (action) {
        case "list":
          console.log("List All Goods function pending...");
          break;
        case "filterType":
          console.log("Filter by Category function pending...");
          break;
        case "filterSpecific":
          console.log("Filter by Specific Item function pending...");
          break;
        default:
          showError("Invalid action");
      }
      pressEnterToContinue().then(() => stockMenu());
    });
}

/**
 * Function to display the History Menu
 */
export function historyMenu(): void {
  displayTitle("Transaction History");
  inquirer
    .prompt([
      {
        type: "list",
        name: "option",
        message: chalk.white.underline("► Select an option:"),
        choices: [
          { name: chalk.green("List All Transactions"), value: "list" },
          { name: chalk.blue("Filter by Client"), value: "filterClient" },
          {name: chalk.magenta("Filter by Merchant"), value: "filterMerchant"},
          new inquirer.Separator(),
          { name: chalk.yellow("↩ Return to Reports Menu"), value: "back" },
        ],
      },
    ])
    .then((answers) => {
      const action = answers["option"] as string;
      if (action === "back") {
        return reportsMenu();
      }
      switch (action) {
        case "list":
          console.log("List All Transactions function pending...");
          break;
        case "filterClient":
          console.log("Filter by Client function pending...");
          break;
        case "filterMerchant":
          console.log("Filter by Merchant function pending...");
          break;
        default:
          showError("Invalid action");
      }
      pressEnterToContinue().then(() => historyMenu());
    });
}