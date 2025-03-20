// clientTest.ts
import { Hunter } from "../hunter.js";
import { JsonClientCollection } from "../data/clientDB.js";

// Create hunters using the static method
const Gerald = Hunter.createHunter(
  3,
  "Gerald de Rivia",
  "Human",
  "YoKeSeHermano",
);
const Yenne = Hunter.createHunter(2, "Yennefer de Vengerberg", "Elf", "Añaza");

// Initialize the JsonClientCollection
const clientCollection = new JsonClientCollection();

// Add hunters
console.log("Adding hunters...");
clientCollection.addClient(Gerald);
clientCollection.addClient(Yenne);

// Try to add the same hunters again (should log warnings)
console.log("\nAttempting to add duplicate hunters...");
clientCollection.addClient(Gerald); // Should log a warning
clientCollection.addClient(Yenne); // Should log a warning

// List all hunters
console.log("\nAll hunters:");
console.log(clientCollection.getClients());

// Modify a hunter
console.log("\nModifying Gerald's location...");
clientCollection.modifyClient("H-3", "location", "Rivia");

// Get hunters by race
console.log("\nHunters with race 'Elf':");
console.log(clientCollection.getClientBy("race", "Elf"));

// Remove a hunter
console.log("\nRemoving Yenne...");
clientCollection.removeClient("H-2");

// List all hunters after removal
console.log("\nAll hunters after removal:");
console.log(clientCollection.getClients());
