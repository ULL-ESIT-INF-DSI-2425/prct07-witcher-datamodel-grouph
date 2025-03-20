// itemTest.ts
import { Armor, Weapon, Potion } from "../item.js";
import { JsonItemCollection } from "../data/itemDB.js";

// Create items using the static methods
const armor1 = Armor.createArmor(
  1,
  "Dragon Scale Armor",
  "Armor made from dragon scales.",
  "Dragon Scales",
  15,
  500,
);
const armor2 = Armor.createArmor(
  2,
  "Mithril Plate",
  "Lightweight armor made from mithril.",
  "Mithril",
  10,
  700,
);
const weapon1 = Weapon.createWeapon(
  1,
  "Silver Sword",
  "A sword made of silver.",
  "Silver",
  5,
  300,
);
const weapon2 = Weapon.createWeapon(
  2,
  "Ebony Bow",
  "A powerful bow made of ebony wood.",
  "Ebony Wood",
  3,
  400,
);
const potion1 = Potion.createPotion(
  1,
  "Swallow Potion",
  "Restores vitality.",
  "Celandine Flower",
  1,
  50,
  "Vitality Regeneration",
);
const potion2 = Potion.createPotion(
  2,
  "Cat Potion",
  "Grants night vision.",
  "Vervain",
  1,
  60,
  "Night Vision",
);

// Initialize the JsonItemCollection
const itemCollection = new JsonItemCollection();

// Add items
console.log("Adding items...");
itemCollection.addItem(armor1);
itemCollection.addItem(armor2);
itemCollection.addItem(weapon1);
itemCollection.addItem(weapon2);
itemCollection.addItem(potion1);
itemCollection.addItem(potion2);

// Try to add the same items again (should log warnings)
console.log("\nAttempting to add duplicate items...");
itemCollection.addItem(armor1); // Should log a warning
itemCollection.addItem(weapon1); // Should log a warning
itemCollection.addItem(potion1); // Should log a warning

// List all items
console.log("\nAll items:");
console.log(itemCollection.getItems());

// Query items by name
console.log("\nItems with name containing 'Sword':");
console.log(itemCollection.getItemsByName("Sword"));

// Query items by type
console.log("\nItems of type 'Armor':");
console.log(itemCollection.getItemsByType("Armor"));

// Query items by description
console.log("\nItems with description containing 'vitality':");
console.log(itemCollection.getItemsByDescription("vitality"));

// Sort items by name (ascending)
console.log("\nItems sorted by name (A-Z):");
console.log(itemCollection.sortItemsByName(true));

// Sort items by name (descending)
console.log("\nItems sorted by name (Z-A):");
console.log(itemCollection.sortItemsByName(false));

// Sort items by price (ascending)
console.log("\nItems sorted by price (low to high):");
console.log(itemCollection.sortItemsByPrice(true));

// Sort items by price (descending)
console.log("\nItems sorted by price (high to low):");
console.log(itemCollection.sortItemsByPrice(false));

// Modify an item
console.log("\nModifying armor1's price...");
itemCollection.modifyItem("A-1", "price", 600);

// Verify the modification
console.log("\nAll items after modifying armor1's price:");
console.log(itemCollection.getItems());

// Remove an item
console.log("\nRemoving weapon1...");
itemCollection.removeItem("W-1");
itemCollection.removeItem("A-1");
itemCollection.removeItem("P-1");



// Verify the removal
console.log("\nAll items after removing weapon1:");
console.log(itemCollection.getItems());

// Edge case: Query for non-existent items
console.log("\nQuerying for non-existent items...");
console.log(
  "Items with name containing 'Axe':",
  itemCollection.getItemsByName("Axe"),
);
console.log(
  "Items of type 'Potion' with description containing 'fire':",
  itemCollection.getItemsByDescription("fire"),
);
