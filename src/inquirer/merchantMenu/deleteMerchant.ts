import inquirer from "inquirer";
import { displayTitle, pressEnterToContinue } from "../utils/menuUtils.js";
import { merchantMenu, merchantDB } from "./merchantMenu.js";

export function deleteMerchant(): void {
  displayTitle("Delete Merchant");
  inquirer
    .prompt([
      { type: "input",
        name: "id",
        message: "Enter the Merchant's ID:",
        validate: (input) => {
          if (input === "") return "ID cannot be empty.";
          return merchantDB.getMerchantById(input)
            ? true
            : "Merchant not found.";
        },
        filter: (input) => input.trim(),
      },
    ])
    .then((answers) => {
      merchantDB.removeMerchant(answers.id);
      console.log(`Merchant with ID ${answers.id} deleted successfully!`);
      pressEnterToContinue().then(() => merchantMenu());
    });
}
