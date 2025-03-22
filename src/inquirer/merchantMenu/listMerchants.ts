import chalk from "chalk";
import { displayTitle, pressEnterToContinue } from "../utils/menuUtils.js";
import { merchantMenu, merchantDB } from "./merchantMenu.js";
import { Merchant } from "../../merchant.js"; // Asegúrate de que la ruta sea correcta

export function listMerchants(): void {
  displayTitle("List Merchants");

  const merchants: Merchant[] = merchantDB.getMerchants();

  if (merchants.length === 0) {
    console.log(chalk.yellow("No merchants found."));
  } else {
    console.log(chalk.green("Merchants:"));

    // Preparamos los datos para la tabla
    const tableData = merchants.map(merchant => ({
      ID: merchant.id,
      Name: merchant.name,
      Profession: merchant.profession,
      Location: merchant.location
    }));

    // Muestra la tabla en la consola
    console.table(tableData);
  }

  pressEnterToContinue().then(() => merchantMenu());
}
