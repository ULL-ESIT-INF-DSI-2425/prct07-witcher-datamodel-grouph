import inquirer from "inquirer";
import { displayTitle, pressEnterToContinue } from "../utils/menuUtils.js";
import { clientDB, clientMenu } from "./clientMenu.js";
import { Hunter } from "../../hunter.js";

export function addClient(): void {
  displayTitle("Add Client");
  inquirer
    .prompt([
      { type: "input", name: "name", message: "Enter the client's name:" },
      { type: "input", name: "race", message: "Enter the client's race:" },
      { type: "input", name: "address", message: "Enter the client's address:",
      },
    ])
    .then((answers) => {
      const newId = Date.now().toString();
      const newHunter = new Hunter(
        newId,
        answers.name,
        answers.race,
        answers.address,
      );

      clientDB.addClient(newHunter);
      console.log(`Client "${answers.name}" added successfully!`);
      pressEnterToContinue().then(() => clientMenu());
    });
}
