import { inventory } from "../transactionMenu/transactionMenu.js";
import { displayTitle, pressEnterToContinue } from "../utils/menuUtils.js";
import { reportsMenu } from "./reportsMenu.js";

export function topSelling() {
  displayTitle("Top Selling Item");
  inventory.printMostSoldItem();
  pressEnterToContinue().then(() => reportsMenu());
}
