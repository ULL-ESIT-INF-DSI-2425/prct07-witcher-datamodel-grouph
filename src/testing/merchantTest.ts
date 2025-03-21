// merchantTest.ts
import { Merchant } from "../merchant.js";
import { JsonMerchantCollection } from "../data/merchantDB.js";

// Create merchants using the static method
const Lucien = Merchant.createMerchant(1, "Lucien", "Alchemist", "Añaza");
const Russel = Merchant.createMerchant(2, "Russel", "Blacksmith", "Añaza");
const Elena = Merchant.createMerchant(3, "Elena", "Butcher", "La Laguna");

// Initialize the JsonMerchantCollection
const merchantCollection = new JsonMerchantCollection();

// Add merchants
console.log("Adding merchants...");
merchantCollection.addMerchant(Lucien);
merchantCollection.addMerchant(Russel);
merchantCollection.addMerchant(Elena);

// Try to add the same merchants again (should log warnings)
console.log("\nAttempting to add duplicate merchants...");
merchantCollection.addMerchant(Lucien); // Should log a warning
merchantCollection.addMerchant(Russel); // Should log a warning
merchantCollection.addMerchant(Elena); // Should log a warning

// List all merchants
console.log("\nAll merchants:");
console.log(merchantCollection.getMerchants());

// Modify a merchant
console.log("\nModifying Lucien's location...");
merchantCollection.modifyMerchant("M-1", "location", "La Laguna");

// Get merchants by profession
// console.log("\nMerchants with profession 'Blacksmith':");
// console.log(merchantCollection.getMerchantBy("profession", "Blacksmith"));

// Remove a merchant
console.log("\nRemoving Russel...");
merchantCollection.removeMerchant("M-2");

// List all merchants after removal
console.log("\nAll merchants after removal:");
console.log(merchantCollection.getMerchants());
