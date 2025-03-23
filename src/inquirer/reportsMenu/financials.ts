import { inventory } from "../transactionMenu/transactionMenu.js";
import {
  displayTitle,
  pressEnterToContinue,
  showError,
} from "../utils/menuUtils.js";
import { reportsMenu } from "./reportsMenu.js";


export default function financials() {
  console.log("Financials");
  inventory.printEconomicReport();
  console.log("Press any key to continue");
  pressEnterToContinue().then(() => reportsMenu());
}