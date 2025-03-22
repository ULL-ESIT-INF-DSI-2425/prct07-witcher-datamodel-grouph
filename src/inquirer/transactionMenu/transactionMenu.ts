import inquirer from "inquirer";
import chalk from "chalk";
import {
  displayTitle,
  pressEnterToContinue,
  showError,
} from "../utils/menuUtils.js";
import { mainMenu } from "../mainMenu.js";
import { Inventory } from "../../inventory.js";
import { Hunter } from "../../hunter.js";
import { Merchant } from "../../merchant.js";
import { clientDB } from "../../inquirer/clientMenu/clientMenu.js";
import { merchantDB } from "../../inquirer/merchantMenu/merchantMenu.js";
import { itemDB } from "../../inquirer/goodsMenu/goodsMenu.js";

const clientCollection = clientDB;
const itemCollection = itemDB;
const merchantCollection = merchantDB;

export const inventory = new Inventory(clientCollection, merchantCollection, itemCollection);

export function transactionsMenu(): void {
  displayTitle("Transactions Menu");
  inquirer
    .prompt([
      {
        type: "list",
        name: "option",
        message: chalk.white.underline("► Select an option:"),
        choices: [
          { name: chalk.green("Buy from Merchant"), value: "buy" },
          { name: chalk.red("Sell to Client"), value: "sell" },
          {name: chalk.blue("Return Item"), value: "return"},
          new inquirer.Separator(),
          { name: chalk.yellow("↩ Return to Main Menu"), value: "back" },
        ],
      },
    ])
    .then((answers) => {
      const action = answers["option"] as string;
      if (action === "back") return mainMenu();

      switch (action) {
        case "buy":
          //return buyGoods();
        case "sell":
          //return sellGoods();

        case "return":
         // return returnGoods();

        default:
          showError("Invalid action");
          return transactionsMenu();
      }
    });
}


