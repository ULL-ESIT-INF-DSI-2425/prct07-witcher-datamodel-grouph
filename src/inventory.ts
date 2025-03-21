import { Item } from "./item.js";
import { Merchant } from "./merchant.js";
import { Hunter } from "./hunter.js";
import {
  Transaction,
  SaleTransaction,
  PurchaseTransaction,
  ReturnTransaction,
} from "./transaction.js";
import { ClientCollection } from "./collections/clientCollection.js";
import { MerchantCollection } from "./collections/merchantCollection.js";
import { ItemCollection } from "./collections/itemCollection.js";

type ItemStock = Map<Item, number>;

export class Inventory {
  private transactions: Transaction[] = [];
  private stock: ItemStock = new Map();
  private clientCollection: ClientCollection;
  private merchantCollection: MerchantCollection;
  private itemCollection: ItemCollection;

  constructor(
    clientCollection: ClientCollection,
    merchantCollection: MerchantCollection,
    itemCollection: ItemCollection,
  ) {
    this.clientCollection = clientCollection;
    this.merchantCollection = merchantCollection;
    this.itemCollection = itemCollection;
  }

  // Add an item to the stock
  addItemToStock(item: Item, quantity: number): void {
    if (quantity <= 0) {
      throw new Error(`Quantity must be greater than 0 for item: ${item.name}`);
    }
    const currentQuantity = this.stock.get(item) || 0;
    this.stock.set(item, currentQuantity + quantity);
  }

  // Remove an item from the stock
  removeItemFromStock(item: Item, quantity: number): void {
    if (quantity <= 0) {
      throw new Error(`Quantity must be greater than 0 for item: ${item.name}`);
    }
    const currentQuantity = this.stock.get(item) || 0;
    if (currentQuantity < quantity) {
      throw new Error(`Not enough stock for item: ${item.name}`);
    }
    this.stock.set(item, currentQuantity - quantity);
  }

  // Get the current stock level for an item
  getStockLevel(item: Item): number {
    return this.stock.get(item) || 0;
  }

  recordSale(client: Hunter, items: Item[]): void {
    if (!this.clientCollection.getClientById(client.id)) {
      throw new Error(`Client with ID ${client.id} does not exist.`);
    }

    // Count the quantity of each item in the sale
    const itemQuantities = new Map<Item, number>();
    items.forEach((item) => {
      itemQuantities.set(item, (itemQuantities.get(item) || 0) + 1);
    });

    // Validate stock levels
    itemQuantities.forEach((quantity, item) => {
      if (!this.itemCollection.getItems().includes(item)) {
        throw new Error(`Item with ID ${item.id} does not exist.`);
      }
      if (this.getStockLevel(item) < quantity) {
        throw new Error(`Not enough stock for item: ${item.name}`);
      }
    });

    const totalCrowns = this.calculateTotalCrowns(items);
    const transaction: SaleTransaction = {
      date: new Date(),
      items,
      client,
      operationType: "sell",
      totalCrowns,
    };
    this.transactions.push(transaction);

    // Update stock levels
    itemQuantities.forEach((quantity, item) => {
      this.removeItemFromStock(item, quantity);
    });
  }

  // Record a purchase transaction
  recordPurchase(merchant: Merchant, items: Item[]): void {
    if (!this.merchantCollection.getMerchantById(merchant.id)) {
      throw new Error(`Merchant with ID ${merchant.id} does not exist.`);
    }

    // Validate items
    items.forEach((item) => {
      if (!this.itemCollection.getItems().includes(item)) {
        throw new Error(`Item with ID ${item.id} does not exist.`);
      }
    });

    const totalCrowns = this.calculateTotalCrowns(items);
    const transaction: PurchaseTransaction = {
      date: new Date(),
      items,
      merchant,
      operationType: "buy",
      totalCrowns,
    };
    this.transactions.push(transaction);

    // Update stock levels
    items.forEach((item) => {
      this.addItemToStock(item, 1);
    });
  }

  // Record a return transaction
  recordReturn(from: Hunter | Merchant, items: Item[], reason: string): void {
    if (from instanceof Hunter) {
      if (!this.clientCollection.getClientById(from.id)) {
        throw new Error(`Client with ID ${from.id} does not exist.`);
      }
    } else if (from instanceof Merchant) {
      if (!this.merchantCollection.getMerchantById(from.id)) {
        throw new Error(`Merchant with ID ${from.id} does not exist.`);
      }

      // Validate items
      items.forEach((item) => {
        if (!this.itemCollection.getItems().includes(item)) {
          throw new Error(`Item with ID ${item.id} does not exist.`);
        }
        if (this.getStockLevel(item) < 1) {
          throw new Error(`Not enough stock for item: ${item.name}`);
        }
      });
    }

    const totalCrowns = this.calculateTotalCrowns(items);
    const transaction: ReturnTransaction = {
      date: new Date(),
      items,
      from,
      reason,
      operationType: "return",
      totalCrowns,
    };
    this.transactions.push(transaction);

    // Update stock levels
    if (from instanceof Hunter) {
      items.forEach((item) => {
        this.addItemToStock(item, 1);
      });
    } else if (from instanceof Merchant) {
      items.forEach((item) => {
        this.removeItemFromStock(item, 1);
      });
    }
  }

  // Helper method to calculate the total crowns for a transaction
  private calculateTotalCrowns(items: Item[]): number {
    return items.reduce((total, item) => total + item.price, 0);
  }

  // Get all transactions
  getAllTransactions(): Transaction[] {
    return this.transactions;
  }

  // Get sales transactions
  getSales(): SaleTransaction[] {
    return this.transactions.filter(
      (t) => t.operationType === "sell",
    ) as SaleTransaction[];
  }

  // Get purchase transactions
  getPurchases(): PurchaseTransaction[] {
    return this.transactions.filter(
      (t) => t.operationType === "buy",
    ) as PurchaseTransaction[];
  }

  // Get return transactions
  getReturns(): ReturnTransaction[] {
    return this.transactions.filter(
      (t) => t.operationType === "return",
    ) as ReturnTransaction[];
  }

  // Get transactions by client
  getTransactionsByClient(hunter: Hunter): SaleTransaction[] {
    return this.getSales().filter((t) => t.client === hunter);
  }

  // Get transactions by merchant
  getTransactionsByMerchant(merchant: Merchant): PurchaseTransaction[] {
    return this.getPurchases().filter((t) => t.merchant === merchant);
  }

  // Get transactions by item
  getTransactionsByItem(item: Item): Transaction[] {
    return this.transactions.filter((t) => t.items.includes(item));
  }

  // Get transactions by date
  getTransactionsByDate(date: Date): Transaction[] {
    return this.transactions.filter(
      (t) => t.date.toDateString() === date.toDateString(),
    );
  }

  // Get transactions by date range
  getTransactionsByDateRange(start: Date, end: Date): Transaction[] {
    return this.transactions.filter((t) => t.date >= start && t.date <= end);
  }

  // Get client returns
  getClientReturns(): ReturnTransaction[] {
    return this.getReturns().filter((t) => t.from instanceof Hunter);
  }

  // Get merchant returns
  getMerchantReturns(): ReturnTransaction[] {
    return this.getReturns().filter((t) => t.from instanceof Merchant);
  }
}
