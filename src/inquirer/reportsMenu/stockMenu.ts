import chalk from "chalk";
import inquirer from "inquirer";
import { displayTitle, showError, pressEnterToContinue } from "../utils/menuUtils.js";
import { reportsMenu } from "./reportsMenu.js";
import { inventory } from "../transactionMenu/transactionMenu.js";
import { itemDB } from "../goodsMenu/goodsMenu.js";
import { ItemCollection } from "../../collections/itemCollection.js";

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
          {
            name: chalk.red("Filter by Specific Item"),
            value: "filterSpecific",
          },
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