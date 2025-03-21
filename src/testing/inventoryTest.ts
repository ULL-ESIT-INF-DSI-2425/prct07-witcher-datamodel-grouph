import {
  Armor,
  Weapon,
  Potion,
  Effect,
  Item,
  ArmorMaterial,
  GenericMaterial,
  PotionMaterial,
  WeaponMaterial,
} from "../item.js";
import { Merchant } from "../merchant.js";
import { Hunter } from "../hunter.js";
import { Inventory } from "../inventory.js";
import { ClientCollection } from "../collections/clientCollection.js";
import { MerchantCollection } from "../collections/merchantCollection.js";
import { ItemCollection } from "../collections/itemCollection.js";

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

// Create a hunter that doesn't exist in the collection
const nonExistentHunter = new Hunter(
  "H-999",
  "Unknown Hunter",
  "Elf",
  "Nowhere",
);

// Create a merchant that doesn't exist in the collection
const nonExistentMerchant = new Merchant(
  "M-999",
  "Unknown Merchant",
  "Alchemist",
  "Nowhere",
);

// Create collections
const clientCollection = new ClientCollection(
  (id, name, race, location) => new Hunter(id, name, race, location),
);
const merchantCollection = new MerchantCollection(
  (id, name, profession, location) =>
    new Merchant(id, name, profession, location),
);

class InMemoryItemCollection extends ItemCollection {
  protected items: Item[] = []; // Change visibility to protected

  constructor() {
    super((id, name, description, material, weight, price) => {
      // For testing, we can create items directly without worrying about persistence
      if (id.startsWith("A-")) {
        return new Armor(
          id,
          name,
          description,
          material as ArmorMaterial, // Cast to ArmorMaterial
          weight,
          price,
        );
      } else if (id.startsWith("W-")) {
        return new Weapon(
          id,
          name,
          description,
          material as WeaponMaterial, // Cast to WeaponMaterial
          weight,
          price,
        );
      } else if (id.startsWith("P-")) {
        return new Potion(
          id,
          name,
          description,
          material as PotionMaterial, // Cast to PotionMaterial
          weight,
          price,
          "Vitality Regeneration" as Effect, // Default effect for testing
        );
      } else {
        throw new Error(`Unknown item type for ID: ${id}`);
      }
    });
  }

  addItem(newItem: Item): void {
    if (this.items.some((i) => i.id === newItem.id)) {
      throw new Error(`Item with ID ${newItem.id} already exists.`);
    }
    this.items.push(newItem);
  }

  removeItem(removeId: string): void {
    this.items = this.items.filter((i) => i.id !== removeId);
  }

  getItems(): Item[] {
    return this.items;
  }

  modifyItem(
    modifyId: string,
    parameter: keyof Item,
    newValue: string | GenericMaterial | number,
  ): void {
    const item = this.items.find((i) => i.id === modifyId);
    if (item) {
      item[parameter] = newValue as never;
    } else {
      throw new Error(`Item with ID ${modifyId} not found.`);
    }
  }
}

// Initialize the in-memory item collection
const itemCollection = new InMemoryItemCollection();

// Add items to the item collection
itemCollection.addItem(armor);
itemCollection.addItem(weapon);
itemCollection.addItem(potion);

// Add clients and merchants to their collections
clientCollection.addClient(hunter);
merchantCollection.addMerchant(merchant);

// Initialize the Inventory with the collections
const inventory = new Inventory(
  clientCollection,
  merchantCollection,
  itemCollection,
);

// Add initial stock
inventory.addItemToStock(armor, 5);
inventory.addItemToStock(weapon, 10);
inventory.addItemToStock(potion, 20);

// Helper function to handle errors
function handleError(error: unknown, context: string) {
  if (error instanceof Error) {
    console.error(`Error in ${context}:`, error.message);
  } else {
    console.error(`Unknown error in ${context}:`, error);
  }
}

// Test 1: Record a valid sale transaction
console.log("Test 1: Recording a valid sale transaction...");
try {
  inventory.recordSale(hunter, [weapon, potion]);
  console.log("Sale recorded successfully.");
} catch (error) {
  handleError(error, "recording sale");
}

// Test 2: Record a sale with a non-existent hunter
console.log("\nTest 2: Recording a sale with a non-existent hunter...");
try {
  inventory.recordSale(nonExistentHunter, [weapon]);
  console.log("Sale recorded successfully.");
} catch (error) {
  handleError(error, "recording sale with non-existent hunter");
}

// Test 3: Record a valid purchase transaction
console.log("\nTest 3: Recording a valid purchase transaction...");
try {
  inventory.recordPurchase(merchant, [armor]);
  console.log("Purchase recorded successfully.");
} catch (error) {
  handleError(error, "recording purchase");
}

// Test 4: Recording a purchase with a non-existent merchant
console.log("\nTest 4: Recording a purchase with a non-existent merchant...");
try {
  inventory.recordPurchase(nonExistentMerchant, [armor]);
  console.log("Purchase recorded successfully.");
} catch (error) {
  handleError(error, "recording purchase with non-existent merchant");
}

// Test 5: Recording a valid return transaction
console.log("\nTest 5: Recording a valid return transaction...");
try {
  inventory.recordReturn(hunter, [potion], "Defective item");
  console.log("Return recorded successfully.");
} catch (error) {
  handleError(error, "recording return");
}

// Test 6: Recording a return with insufficient stock
console.log("\nTest 6: Recording a return with insufficient stock...");
try {
  // Attempt to return more potions than are in stock
  inventory.recordReturn(hunter, [potion, potion, potion], "Defective items");
  console.log("Return recorded successfully.");
} catch (error) {
  handleError(error, "recording return with insufficient stock");
}

// Test 7: Recording a sale with insufficient stock
console.log("\nTest 7: Recording a sale with insufficient stock...");
try {
  // Attempt to sell more weapons than are in stock
  inventory.recordSale(hunter, [armor, armor, armor, armor, armor, armor]);
  console.log("Sale recorded successfully.");
} catch (error) {
  handleError(error, "recording sale with insufficient stock");
}

// List all transactions
console.log("\nAll transactions:");
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
