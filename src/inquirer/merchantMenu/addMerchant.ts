import inquirer from "inquirer";
import { displayTitle, pressEnterToContinue } from "../utils/menuUtils.js";
import { merchantMenu, merchantDB } from "./merchantMenu.js";
import { Merchant, Profession } from "../../merchant.js";

const validProfessions: Profession[] = [
  "Blacksmith",
  "Alchemist",
  "General Merchant",
  "Butcher",
  "Druid",
  "Smuggler",
] as const;

export function addMerchant(): void {
  displayTitle("Add Merchant");
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the Merchant's name:",
      },
      {
        type: "input",
        name: "profession",
        message: "Enter the Merchant's profession:",
        validate: (input) => {
          const trimmedInput = input.trim() as Profession;
          if (input === "") {
            return "Profession cannot be empty.";
          }
          return validProfessions.includes(trimmedInput)
            ? true
            : `Invalid profession. Choose from ${validProfessions.join(", ")}.`;
        }
      },
      {
        type: "input",
        name: "address",
        message: "Enter the Merchant's address:",
      },
    ])
    .then((answers) => {
      const newId = Date.now().toString();
      const merchant = new Merchant(
        newId,
        answers.name,
        answers.profession,
        answers.address,
      );
      merchantDB.addMerchant(merchant);
      console.log(`Merchant "${answers.name}" added successfully!`);
      pressEnterToContinue().then(() => merchantMenu());
    });
}
