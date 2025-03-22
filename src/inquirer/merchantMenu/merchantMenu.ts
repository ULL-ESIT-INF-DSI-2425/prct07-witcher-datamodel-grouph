import inquirer from "inquirer";
import chalk from "chalk";

import {
  displayTitle,
  pressEnterToContinue,
  showError,
} from "../utils/menuUtils.js";
import { mainMenu } from "../mainMenu.js";
import { JsonMerchantCollection } from "../../data/merchantDB.js";
import { addMerchant } from "./addMerchant.js";
import { deleteMerchant } from "./deleteMerchant.js";
import { updateMerchant } from "./updateMerchant.js";
import { listMerchants } from "./listMerchants.js";

export const merchantDB = new JsonMerchantCollection();

export function merchantMenu(): void {
  displayTitle("Manage Merchants");
  inquirer
    .prompt([
      {
        type: "list",
        name: "option",
        message: chalk.white.underline("► Select an option:"),
        choices: [
          { name: chalk.green("Add Merchant"), value: "add" },
          { name: chalk.red("Delete Merchant"), value: "delete" },
          { name: chalk.blue("Update Merchant"), value: "update" },
          { name: chalk.magenta("List Merchants"), value: "list" },
          new inquirer.Separator(),
          { name: chalk.yellow("↩ Return to Main Menu"), value: "back" },
        ],
      },
    ])
    .then((answers) => {
      const action = answers["option"] as string;
      if (action === "back") return mainMenu();

      switch (action) {
        case "add":
          return addMerchant();
        case "delete":
          return deleteMerchant();
        case "update":
          return updateMerchant();
        case "list":
          return listMerchants();
        default:
          showError("Invalid action");
          return merchantMenu();
      }
      pressEnterToContinue().then(() => merchantMenu());
    });
}
