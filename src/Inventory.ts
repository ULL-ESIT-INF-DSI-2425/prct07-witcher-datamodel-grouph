import { Item } from "./item.js";
import { Merchant } from "./merchant.js";
import { Hunter } from "./hunter.js";
import {
  Transaction,
  SaleTransaction,
  PurchaseTransaction,
  ReturnTransaction,
} from "./collections/registerCollection.js";

type ItemStock = Map<Item, number>;

export class Inventory {
  private transactions: Transaction[] = [];
  private stock: ItemStock = new Map();

  // Add an item to the stock
  addItemToStock(item: Item, quantity: number): void {
    const currentQuantity = this.stock.get(item) || 0;
    this.stock.set(item, currentQuantity + quantity);
  }

  // Remove an item from the stock
  removeItemFromStock(item: Item, quantity: number): void {
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

  // Record a sale transaction
  recordSale(client: Hunter, items: Item[]): void {
    const totalCrowns = this.calculateTotalCrowns(items);
    const transaction: SaleTransaction = {
      date: new Date(),
      items,
      client,
      operationType: "sell",
      totalCrowns, // Include the total cost
    };
    this.transactions.push(transaction);
    items.forEach((item) => this.removeItemFromStock(item, 1));
  }

  // Record a purchase transaction
  recordPurchase(merchant: Merchant, items: Item[]): void {
    const totalCrowns = this.calculateTotalCrowns(items);
    const transaction: PurchaseTransaction = {
      date: new Date(),
      items,
      merchant,
      operationType: "buy",
      totalCrowns, // Include the total cost
    };
    this.transactions.push(transaction);
    items.forEach((item) => this.addItemToStock(item, 1));
  }

  // Record a return transaction
  recordReturn(from: Hunter | Merchant, items: Item[], reason: string): void {
    const totalCrowns = this.calculateTotalCrowns(items);
    const transaction: ReturnTransaction = {
      date: new Date(),
      items,
      from,
      reason,
      operationType: "return",
      totalCrowns, // Include the total cost
    };
    this.transactions.push(transaction);
    if (from instanceof Hunter) {
      // Return from a hunter: add items back to stock
      items.forEach((item) => this.addItemToStock(item, 1));
    } else if (from instanceof Merchant) {
      // Return to a merchant: remove items from stock
      items.forEach((item) => this.removeItemFromStock(item, 1));
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
