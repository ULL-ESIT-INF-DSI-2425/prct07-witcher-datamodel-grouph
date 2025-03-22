import inquirer from "inquirer";
import { displayTitle, pressEnterToContinue } from "../utils/menuUtils.js";
import { merchantMenu, merchantDB } from "./merchantMenu.js";

export function deleteMerchant(): void {
  displayTitle("Delete Merchant");
  inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "Enter the Merchant's ID:",
      },
    ])
    .then((answers) => {
      merchantDB.removeMerchant(answers.id);
      console.log(`Merchant with ID ${answers.id} deleted successfully!`);
      pressEnterToContinue().then(() => merchantMenu());
    });
}
