import { inventory } from "../transactionMenu/transactionMenu.js";
import {
    displayTitle,
    pressEnterToContinue,
    showError,
  } from "../utils/menuUtils.js";
  import { reportsMenu } from "./reportsMenu.js";


export function topSelling() {
  console.log("Top Selling Items");
  inventory.printMostSoldItem();
  console.log("Press any key to continue");
  pressEnterToContinue().then(() => reportsMenu());
}