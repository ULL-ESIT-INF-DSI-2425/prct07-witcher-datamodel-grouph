// inventoryTest.ts
import { Armor, Weapon, Potion } from "../item.js";
import { Merchant } from "../merchant.js";
import { Hunter } from "../hunter.js";
import { Inventory } from "../Inventory.js";

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

// Initialize the Inventory
const inventory = new Inventory();

// Add initial stock
inventory.addItemToStock(armor, 5);
inventory.addItemToStock(weapon, 10);
inventory.addItemToStock(potion, 20);

// Record a sale transaction
inventory.recordSale(hunter, [weapon, potion]);

// Record a purchase transaction
inventory.recordPurchase(merchant, [armor]);

// Record a return transaction
inventory.recordReturn(hunter, [potion], "Defective item");

// List all transactions
console.log("All transactions:");
console.log(inventory.getAllTransactions());

// Verify stock levels
console.log("\nStock levels:");
console.log("Dragon Scale Armor:", inventory.getStockLevel(armor));
console.log("Silver Sword:", inventory.getStockLevel(weapon));
console.log("Swallow Potion:", inventory.getStockLevel(potion));

// Verify transactions
console.log("\nSales:");
console.log(inventory.getSales());

console.log("\nPurchases:");
console.log(inventory.getPurchases());

console.log("\nReturns:");
console.log(inventory.getReturns());
