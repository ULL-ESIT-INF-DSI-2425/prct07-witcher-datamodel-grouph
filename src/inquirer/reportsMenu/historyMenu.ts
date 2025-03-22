import chalk from "chalk";
import inquirer from "inquirer";
import { displayTitle, showError, pressEnterToContinue } from "../utils/menuUtils.js";
import { reportsMenu } from "./reportsMenu.js";

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
          {
            name: chalk.magenta("Filter by Merchant"),
            value: "filterMerchant",
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
          console.log("List All Transactions function pending...");

          break;
        case "filterClient":

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