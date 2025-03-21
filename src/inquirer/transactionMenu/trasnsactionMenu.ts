import inquirer from "inquirer";
import chalk from "chalk";
import { clearConsole, displayTitle, pressEnterToContinue, showError } from "../utils/menuUtils.js";
import { mainMenu } from "../mainMenu.js";



export function transactionsMenu(): void {
  displayTitle("Register Transaction");
  inquirer
    .prompt([
      {
        type: "list",
        name: "option",
        message: chalk.white.underline("► Select an option:"),
        choices: [
          { name: chalk.green("Sell to Client"), value: "sell" },
          { name: chalk.blue("Buy from Merchant"), value: "buy" },
          { name: chalk.red("Return Item"), value: "return" },
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
        case "sell":
          console.log("Sell to Client function pending...");
          break;
        case "buy":
          console.log("Buy from Merchant function pending...");
          break;
        case "return":
          console.log("Return Item function pending...");
          break;
        default:
          showError("Invalid action");
      }
      pressEnterToContinue().then(() => transactionsMenu());
    });
}
