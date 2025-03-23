import { inventory } from "../transactionMenu/transactionMenu.js";
import { pressEnterToContinue } from "../utils/menuUtils.js";
import { reportsMenu } from "./reportsMenu.js";

/**
 * Displays the top selling items.
 */
export function topSelling() {
  console.log("Top Selling Items");
  inventory.printMostSoldItem();
  console.log("Press any key to continue");
  pressEnterToContinue().then(() => reportsMenu());
}
