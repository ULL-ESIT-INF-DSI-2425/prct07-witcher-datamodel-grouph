import inquirer from "inquirer";
import { displayTitle, pressEnterToContinue } from "../utils/menuUtils.js";
import { goodsMenu, itemDB } from "./goodsMenu.js";
import { Armor, Weapon, Potion } from "../../item.js";

export function addGood(): void {
  displayTitle("Add Good");

  inquirer
    .prompt([
      {
        type: "input",
        name: "object",
        message: "Enter the item's type (Potion, Armor, Weapon):",
        validate: (input) => {
          const validTypes = ["potion", "armor", "weapon"];
          return validTypes.includes(input.trim().toLowerCase())
            ? true
            : "Invalid item type. Choose between Potion, Armor, or Weapon.";
        },
        filter: (input) => input.trim().toLowerCase(),
      },
      {
        type: "input",
        name: "name",
        message: "Enter the item's name:",
        filter: (input) => input.trim(),
      },
      {
        type: "input",
        name: "description",
        message: "Enter the item's description:",
        filter: (input) => input.trim(),
      },
      {
        type: "input",
        name: "material",
        message: "Enter the item's material:",
        filter: (input) => input.trim(),
      },
      {
        type: "input",
        name: "weight",
        message: "Enter the item's weight:",
        validate: (input) =>
          !isNaN(parseFloat(input)) && parseFloat(input) > 0
            ? true
            : "Weight must be a positive number.",
        filter: (input) => parseFloat(input),
      },
      {
        type: "input",
        name: "price",
        message: "Enter the item's price:",
        validate: (input) =>
          !isNaN(parseFloat(input)) && parseFloat(input) > 0
            ? true
            : "Price must be a positive number.",
        filter: (input) => parseFloat(input),
      },
    ])
    .then((answers) => {
      try {
        const newId = Date.now();

        let newItem;

        switch (answers.object) {
          case "potion":
            newItem = Potion.createPotion(
              newId,
              answers.name,
              answers.description,
              answers.material,
              answers.weight,
              answers.price,
              "None",
            );
            break;
          case "armor":
            newItem = Armor.createArmor(
              newId,
              answers.name,
              answers.description,
              answers.material,
              answers.weight,
              answers.price,
            );
            break;
          case "weapon":
            newItem = Weapon.createWeapon(
              newId,
              answers.name,
              answers.description,
              answers.material,
              answers.weight,
              answers.price,
            );
            break;
          default:
            console.error("❌ Invalid item type. Operation aborted.");
            return;
        }

        itemDB.addItem(newItem);
        console.log(
          `✔ Item "${answers.name}" added successfully! ID: ${newId}`,
        );
      } catch (error) {
        console.error("❌ An error occurred while adding the item:", error);
      }

      pressEnterToContinue().then(() => goodsMenu());
    });
}
