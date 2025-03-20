import { Armor, Weapon, Potion } from "../item.js";
import { Merchant } from "../merchant.js";
import { Hunter } from "../hunter.js";

type Item = Armor | Weapon | Potion;

export type OperationType = "buy" | "sell" | "return";

export interface BaseTransaction {
  date: Date;
  items: Item[];
  crowns: number;
}

export interface SaleTransaction extends BaseTransaction {
  client: Hunter,
  operationType: "sell";
}

export interface PurchaseTransaction extends BaseTransaction {
  merchant: Merchant,
  operationType: "buy";
}

export interface ReturnTransaction extends BaseTransaction {
  from: Hunter | Merchant,
  reason: string,
  operationType: "return";
}

export type Transaction = SaleTransaction | PurchaseTransaction | ReturnTransaction;

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
  private _transactions: Transaction[] = [];

  constructor() {
    this._transactions = [];
  }

  add(transaction: Transaction): void {
    this._transactions.push(transaction);
  }
  getAll(): Transaction[] {
    return this._transactions;
  }

  getSales(): SaleTransaction[] {
    return this._transactions.filter((t) => t.operationType === "sell") as SaleTransaction[];
  }
  getPurchases(): PurchaseTransaction[] {
    return this._transactions.filter((t) => t.operationType === "buy") as PurchaseTransaction[];
  }
  getReturns(): ReturnTransaction[] {
    return this._transactions.filter((t) => t.operationType === "return") as ReturnTransaction[];
  }
  getTransactionsByClient(hunter: Hunter): SaleTransaction[] {
    return this._transactions.filter((t) => t.operationType === "sell" && (t as SaleTransaction).client === hunter) as SaleTransaction[];
  }
  getTransactionsByMerchant(merchant: Merchant): PurchaseTransaction[] {
    return this._transactions.filter((t) => t.operationType === "buy" && (t as PurchaseTransaction).merchant === merchant) as PurchaseTransaction[];
  }
  getTransactionsByItem(item: Item): Transaction[] {
    return this._transactions.filter((t) => t.items.includes(item));
  }
  getTransactionsByDate(date: Date): Transaction[] {
    return this._transactions.filter((t) => t.date.toDateString() === date.toDateString());
  }
  getTransactionsByDateRange(start: Date, end: Date): Transaction[] {
    return this._transactions.filter((t) => t.date >= start && t.date <= end);
  }

  getClientReturns(): ReturnTransaction[] {
    return this.getReturns().filter((t) => t.operationType === "return" && t.from instanceof Hunter) as ReturnTransaction[];
  }
  getMerchantReturns(): ReturnTransaction[] {
    return this._transactions.filter((t) => t.operationType === "return" && t.from instanceof Merchant) as ReturnTransaction[];
  }
}