import inquirer from "inquirer";
import chalk from "chalk";
import boxen from "boxen";
import { clearConsole, displayTitle, pressEnterToContinue, showError } from "./utils/menuUtils.js";
import { goodsMenu } from "./goodsMenu/goodsMenu.js";
import { merchantMenu } from "./merchantMenu/merchantMenu.js";
import { clientMenu } from "./clientMenu/clientMenu.js";
import { transactionsMenu } from "./transactionMenu/trasnsactionMenu.js";
import { reportsMenu } from "./reportsMenu/reportsMenu.js";
import { Inventory } from "../inventory.js";

import { JsonClientCollection } from "../data/clientDB.js";
import { JsonItemCollection } from "../data/itemDB.js";
import { JsonMerchantCollection } from "../data/merchantDB.js";

const clientCollection = new JsonClientCollection();
const itemCollection = new JsonItemCollection();
const merchantCollection = new JsonMerchantCollection();

export function mainMenu(): void {
  displayTitle("Inventory Management System");
  inquirer
    .prompt([
      {
        type: "list",
        name: "option",
        message: chalk.white.underline("► Select an option:"),
        choices: [
          { name: chalk.blue("Manage Goods"), value: "goods" },
          { name: chalk.yellow("Manage Merchants"), value: "merchants" },
          { name: chalk.green("Manage Clients"), value: "clients" },
          { name: chalk.magenta("Register Transaction"), value: "transactions" },
          { name: chalk.cyan("Generate Reports"), value: "reports" },
          new inquirer.Separator(),
          { name: chalk.red("Exit"), value: "exit" },
        ],
      },
    ])
    .then((answers) => {
      const option = answers["option"] as string;
      if (option === "exit") {
        clearConsole();
        console.log(
          boxen(chalk.bold("Bye ;)"), {
            padding: 1,
            margin: 1,
            borderStyle: "round",
            borderColor: "cyan",
          })
        );
        return;
      }
      switch (option) {
        case "goods":
          goodsMenu();
          break;
        case "merchants":
          merchantMenu();
          break;
        case "clients":
          clientMenu();
          break;
        case "transactions":
          transactionsMenu();
          break;
        case "reports":
          reportsMenu();
          break;
        default:
          showError("Invalid action");
          pressEnterToContinue().then(() => mainMenu());
      }
    });
}

clearConsole();

console.log(chalk.cyan("Starting Inventory Management System..."));
setTimeout(() => {
  mainMenu();
}, 1000);
