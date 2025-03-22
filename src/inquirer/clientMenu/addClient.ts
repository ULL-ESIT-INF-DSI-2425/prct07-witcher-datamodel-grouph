import inquirer from "inquirer";
import { displayTitle, pressEnterToContinue } from "../utils/menuUtils.js";
import { clientDB, clientMenu } from "./clientMenu.js";
import { Hunter, Race } from "../../hunter.js";

const validRaces: Race[] = [
  "Human",
  "Elf",
  "Dwarf",
  "Halfling",
  "Warlock",
  "Lycanthropic",
  "Vran",
  "Dryad",
  "Spectral Cat",
  "Half-Elf",
] as const;

export function addClient(): void {
  displayTitle("Add Client");
  inquirer
    .prompt([
      { type: "input", name: "name", message: "Enter the client's name:" },
      { type: "input", name: "race", message: "Enter the client's race:",
        validate: (input) => {
          const trimmedInput = input.trim() as Race;
          return validRaces.includes(trimmedInput)
            ? true
            : `Invalid race. Choose form ${validRaces.join(", ")}.`;
        }
      },

      { type: "input", name: "address", message: "Enter the client's address:" },
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
