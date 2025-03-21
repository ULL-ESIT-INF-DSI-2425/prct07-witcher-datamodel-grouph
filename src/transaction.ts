import { Armor, Weapon, Potion } from "./item.js";
import { Merchant } from "./merchant.js";
import { Hunter } from "./hunter.js";

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
