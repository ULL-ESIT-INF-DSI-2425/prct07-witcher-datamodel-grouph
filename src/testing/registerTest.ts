// registerTest.ts
import { Armor, Weapon, Potion } from "../item.js";
import { Merchant } from "../merchant.js";
import { Hunter } from "../hunter.js";
import { JsonRegisterCollection } from "../data/registerDB.js";
import {
  PurchaseTransaction,
  ReturnTransaction,
  SaleTransaction,
} from "../collections/registerCollection.js";

// Create items
const armor = Armor.createArmor(
  1,
  "Dragon Scale Armor",
  "Armor made from dragon scales.",
  "Dragon Scales",
  15,
  500,
);
const weapon = Weapon.createWeapon(
  2,
  "Silver Sword",
  "A sword made of silver.",
  "Silver",
  5,
  300,
);
const potion = Potion.createPotion(
  3,
  "Swallow Potion",
  "Restores vitality.",
  "Celandine Flower",
  1,
  50,
  "Vitality Regeneration",
);

// Create clients and merchants
const hunter = new Hunter("H-1", "Geralt of Rivia", "Human", "Kaer Morhen");
const merchant = new Merchant("M-1", "Lucien", "Druid", "Añaza");

// Initialize the JsonRegisterCollection
const registerCollection = new JsonRegisterCollection();

// Add a sale transaction
const saleTransaction: SaleTransaction = {
  date: new Date(),
  items: [weapon, potion],
  totalCrowns: 0, // Will be calculated automatically
  client: hunter,
  operationType: "sell",
};
registerCollection.add(saleTransaction);

// Add a purchase transaction
const purchaseTransaction: PurchaseTransaction = {
  date: new Date(),
  items: [armor],
  totalCrowns: 0, // Will be calculated automatically
  merchant: merchant,
  operationType: "buy",
};
registerCollection.add(purchaseTransaction);

// Add a return transaction
const returnTransaction: ReturnTransaction = {
  date: new Date(),
  items: [potion],
  totalCrowns: 0, // Will be calculated automatically
  from: hunter,
  reason: "Defective item",
  operationType: "return",
};
registerCollection.add(returnTransaction);

// List all transactions
console.log("All transactions:");
console.log(registerCollection.getAll());

// Verify the crowns are calculated correctly
console.log("\nCrowns for sale transaction:", saleTransaction.totalCrowns); // Expected: 350 (300 + 50)
console.log(
  "Crowns for purchase transaction:",
  purchaseTransaction.totalCrowns,
); // Expected: 500
console.log("Crowns for return transaction:", returnTransaction.totalCrowns); // Expected: 50
