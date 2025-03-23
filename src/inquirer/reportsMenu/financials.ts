import { inventory } from "../transactionMenu/transactionMenu.js";
import { displayTitle, pressEnterToContinue } from "../utils/menuUtils.js";
import { reportsMenu } from "./reportsMenu.js";

export default function financials() {
  displayTitle("Financials Report");
  inventory.printEconomicReport();
  pressEnterToContinue().then(() => reportsMenu());
}
