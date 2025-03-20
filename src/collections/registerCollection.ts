import { Armor, Weapon, Potion } from "../item.js";
import { Merchant } from "../merchant.js";
import { Hunter } from "../hunter.js";

type Item = Armor | Weapon | Potion;

export type OperationType = "buy" | "sell" | "return";

export interface BaseTransaction {
  date: Date;
  items: Item[];
  totalCrowns: number;
}

export interface BaseTransaction {
  date: Date;
  items: Item[];
  totalCrowns: number; // Total cost of the transaction
}

export interface SaleTransaction extends BaseTransaction {
  client: Hunter;
  operationType: "sell";
}

export interface PurchaseTransaction extends BaseTransaction {
  merchant: Merchant;
  operationType: "buy";
}

export interface ReturnTransaction extends BaseTransaction {
  from: Hunter | Merchant;
  reason: string;
  operationType: "return";
}

export type Transaction =
  | SaleTransaction
  | PurchaseTransaction
  | ReturnTransaction;

export interface TransactionCollection {
  add(transaction: Transaction): void;
  getAll(): Transaction[];
  getSales(): SaleTransaction[];
  getPurchases(): PurchaseTransaction[];
  getReturns(): ReturnTransaction[];
  getTransactionsByClient(hunter: Hunter): SaleTransaction[];
  getTransactionsByMerchant(merchant: Merchant): PurchaseTransaction[];
  getTransactionsByItem(item: Item): Transaction[];
  getTransactionsByDate(date: Date): Transaction[];
  getTransactionsByDateRange(start: Date, end: Date): Transaction[];
}

export class RegisterCollection implements TransactionCollection {
  protected transactions: Transaction[] = [];

  constructor() {
    this.transactions = [];
  }

  private calculateTotalCrowns(items: Item[]): number {
    return items.reduce((total, item) => total + item.price, 0);
  }

  add(transaction: Transaction): void {
    transaction.totalCrowns = this.calculateTotalCrowns(transaction.items);
    this.transactions.push(transaction);
  }

  getAll(): Transaction[] {
    return this.transactions;
  }

  getSales(): SaleTransaction[] {
    return this.transactions.filter(
      (t) => t.operationType === "sell",
    ) as SaleTransaction[];
  }

  getPurchases(): PurchaseTransaction[] {
    return this.transactions.filter(
      (t) => t.operationType === "buy",
    ) as PurchaseTransaction[];
  }

  getReturns(): ReturnTransaction[] {
    return this.transactions.filter(
      (t) => t.operationType === "return",
    ) as ReturnTransaction[];
  }

  getTransactionsByClient(hunter: Hunter): SaleTransaction[] {
    return this.transactions.filter(
      (t) =>
        t.operationType === "sell" && (t as SaleTransaction).client === hunter,
    ) as SaleTransaction[];
  }

  getTransactionsByMerchant(merchant: Merchant): PurchaseTransaction[] {
    return this.transactions.filter(
      (t) =>
        t.operationType === "buy" &&
        (t as PurchaseTransaction).merchant === merchant,
    ) as PurchaseTransaction[];
  }

  getTransactionsByItem(item: Item): Transaction[] {
    return this.transactions.filter((t) => t.items.includes(item));
  }

  getTransactionsByDate(date: Date): Transaction[] {
    return this.transactions.filter(
      (t) => t.date.toDateString() === date.toDateString(),
    );
  }

  getTransactionsByDateRange(start: Date, end: Date): Transaction[] {
    return this.transactions.filter((t) => t.date >= start && t.date <= end);
  }

  getClientReturns(): ReturnTransaction[] {
    return this.getReturns().filter(
      (t) => t.operationType === "return" && t.from instanceof Hunter,
    ) as ReturnTransaction[];
  }

  getMerchantReturns(): ReturnTransaction[] {
    return this.transactions.filter(
      (t) => t.operationType === "return" && t.from instanceof Merchant,
    ) as ReturnTransaction[];
  }
}
