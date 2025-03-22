import inquirer from "inquirer";
import { displayTitle, pressEnterToContinue } from "../utils/menuUtils.js";
import { merchantMenu, merchantDB } from "./merchantMenu.js";

export function updateMerchant(): void {
    displayTitle("Update Merchant");
    inquirer
      .prompt([
        {
          type: "input",
          name: "id",
          message: "Enter the Merchant's ID:",
        },
      ])
      .then((answer) => {
        // AQUI VA EL CODIGO PARA VER SI EL MERCHANT EXISTE Y LUEGO ACTUALIZARLO
        console.log("Update Merchant function pending...");
        inquirer
          .prompt([
            {
              type: "list",
              name: "field",
              message: "Select the field to update:",
              choices: [
                { name: "Name", value: "name" },
                { name: "Profession", value: "profession" },
                { name: "Address", value: "address" },
              ],
            },
          ])
          .then(({ field }) => {
            inquirer
              .prompt([
                {
                  type: "input",
                  name: "value",
                  message: `Enter the new ${field}:`,
                },
              ])
              .then((answers) => {
                // AQUI VA EL CODIGO PARA ACTUALIZAR EL MERCHANT
                merchantDB.modifyMerchant(answer.id, field, answers.value);
                console.log(`Merchant with ID ${answer.id} updated successfully!`);
                pressEnterToContinue().then(() => merchantMenu());
              });
          });
      });
  }
  
