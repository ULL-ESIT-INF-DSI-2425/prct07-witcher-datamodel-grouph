import inquirer from "inquirer";
import { displayTitle, pressEnterToContinue } from "../utils/menuUtils.js";
import { clientMenu } from "./clientMenu.js";


export function addClient(): void {
  displayTitle("Add Client");
  inquirer
    .prompt([
      { type: "input", name: "name", message: "Enter the client's name:" },
      { type: "input", name: "race", message: "Enter the client's race:" },
      { type: "input", name: "address", message: "Enter the client's address:" },
    ])
    .then((answers) => {

      console.log(`✔ Client "${answers.name}" added successfully!`);
      pressEnterToContinue().then(() => clientMenu());
    });
}