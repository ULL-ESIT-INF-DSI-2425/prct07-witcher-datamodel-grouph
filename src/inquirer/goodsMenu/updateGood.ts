import inquirer from "inquirer"; 
import { displayTitle, pressEnterToContinue, showSuccess } from "../utils/menuUtils.js";
import { goodsMenu } from "./goodsMenu.js";

export function updateGood(): void {  // ← Renombrado correctamente
  displayTitle("Update Good");
  inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "Enter the item's ID:",
      },
    ])
    .then((answers) => {
      console.log("Update function pending...");
      inquirer
        .prompt([
          {
            type: "list",
            name: "field",
            message: "Select the field to update:",
            choices: [
              { name: "Name", value: "name" },
              { name: "Description", value: "description" },
              { name: "Material", value: "material" },
              { name: "Weight", value: "weight" },
              { name: "Price", value: "price" },
            ],
            loop: false,
          },
        ])
        .then(({ field }) => {
          inquirer
            .prompt([
              {
                type: "input",
                name: "value",
                message: `Enter the new ${field}:`,
                validate: (input) => {
                  if (field === "weight" || field === "price") {
                    return !isNaN(parseFloat(input)) && parseFloat(input) > 0 ? true : `${field} must be a positive number`;
                  }
                  return input.trim().length > 0 ? true : "This field cannot be empty";
                },
                filter: (input) => (field === "weight" || field === "price" ? parseFloat(input) : input),
              },
            ])
            .then((answers) => {
              showSuccess(`✔ Item ${field} updated successfully!`);
              pressEnterToContinue().then(() => goodsMenu());
            });
        });
    });
}