import inquirer from "inquirer";
import { displayTitle, pressEnterToContinue } from "../utils/menuUtils.js";
import { goodsMenu, itemDB } from "./goodsMenu.js";

export function deleteGood(): void {
  displayTitle("Delete Good");
  inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "Enter the item's ID:",
      },
    ])
    .then((answers) => {
      itemDB.removeItem(answers.id);
      console.log(`✔ Item with ID ${answers.id} deleted successfully!`);
      pressEnterToContinue().then(() => goodsMenu());
    });
}
