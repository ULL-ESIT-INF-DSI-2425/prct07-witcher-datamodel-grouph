import { describe, it, expect, beforeEach } from 'vitest';
import { Armor, Weapon, Potion } from '../src/item.js';
import { Merchant } from '../src/merchant.js';
import { Hunter } from '../src/hunter.js';
import { RegisterCollection, SaleTransaction, PurchaseTransaction, ReturnTransaction } from '../src/collections/registerCollection.js';

describe('RegisterCollection', () => {
  let register: RegisterCollection;
  let hunter: Hunter;
  let merchant: Merchant;
  let items: Array<Armor | Weapon | Potion>;
  let saleTransaction: SaleTransaction;
  let purchaseTransaction: PurchaseTransaction;
  let returnTransactionFromHunter: ReturnTransaction;
  let returnTransactionFromMerchant: ReturnTransaction;
  let testDate: Date;

  beforeEach(() => {
    register = new RegisterCollection();
    testDate = new Date();
    
    hunter = new Hunter("1", "John Doe", "Human", "Novigrad");
    merchant = new Merchant("1", "Merchant", "Butcher", "alcampo");
    
    const item1 = new Armor("1", "Steel Armor", "A strong armor", "Leather", 10, 100);
    const item2 = new Weapon("2", "Steel Sword", "A strong sword", "Steel", 5, 50);
    const item3 = new Potion("3", "Healing Potion", "A potion that heals", "Mandrake", 1, 10, "Night Vision");
    const item4 = new Potion("4", "Mana Potion", "A potion that restores mana", "Mandrake", 1, 10, "Speed Boost");
    const item5 = new Armor("5", "Leather Armor", "A light armor", "Leather", 5, 50);
    const item6 = new Weapon("6", "Wooden Sword", "A weak sword", "Silver", 2, 20);
    const item7 = new Potion("7", "Stamina Potion", "A potion that restores stamina", "Vervain", 1, 10, "Toxicity Reduction");
    
    items = [item1, item2, item3, item4, item5, item6, item7];
    
    saleTransaction = {
      date: testDate,
      items: [item1, item2],
      crowns: 150,
      client: hunter,
      operationType: "sell",
    };
    
    purchaseTransaction = {
      date: testDate,
      items: [item3, item4, item5],
      crowns: 70,
      merchant: merchant,
      operationType: "buy",
    };
    
    returnTransactionFromHunter = {
      date: testDate,
      items: [item6],
      crowns: 20,
      from: hunter,
      reason: "Defective item",
      operationType: "return",
    };
    
    returnTransactionFromMerchant = {
      date: testDate,
      items: [item7],
      crowns: 10,
      from: merchant,
      reason: "Wrong order",
      operationType: "return",
    };
    
    register.add(saleTransaction);
    register.add(purchaseTransaction);
    register.add(returnTransactionFromHunter);
    register.add(returnTransactionFromMerchant);
  });

  it('debe agregar transacciones correctamente', () => {
    expect(register.getAll().length).toBe(4);
  });

  it('debe obtener todas las transacciones', () => {
    // console.log(register.getAll());
    const transactions = register.getAll();
    expect(transactions).toContain(saleTransaction);
    expect(transactions).toContain(purchaseTransaction);
    expect(transactions).toContain(returnTransactionFromHunter);
    expect(transactions).toContain(returnTransactionFromMerchant);
  });

  it('debe filtrar transacciones de venta', () => {
    const sales = register.getSales();
    expect(sales.length).toBe(1);
    expect(sales[0]).toBe(saleTransaction);
  });

  it('debe filtrar transacciones de compra', () => {
    const purchases = register.getPurchases();
    expect(purchases.length).toBe(1);
    expect(purchases[0]).toBe(purchaseTransaction);
  });

  it('debe filtrar devoluciones', () => {
    const returns = register.getReturns();
    expect(returns.length).toBe(2);
    expect(returns).toContain(returnTransactionFromHunter);
    expect(returns).toContain(returnTransactionFromMerchant);
  });

  it('debe obtener transacciones por cliente', () => {
    const clientTransactions = register.getTransactionsByClient(hunter);
    expect(clientTransactions.length).toBe(1);
    expect(clientTransactions[0]).toBe(saleTransaction);
  });

  it('debe obtener transacciones por mercader', () => {
    const merchantTransactions = register.getTransactionsByMerchant(merchant);
    expect(merchantTransactions.length).toBe(1);
    expect(merchantTransactions[0]).toBe(purchaseTransaction);
  });

  it('debe obtener transacciones por ítem', () => {
    const itemTransactions = register.getTransactionsByItem(items[0]); // Steel Armor
    expect(itemTransactions.length).toBe(1);
    expect(itemTransactions[0]).toBe(saleTransaction);
  });

  it('debe obtener transacciones por fecha', () => {
    const dateTransactions = register.getTransactionsByDate(testDate);
    expect(dateTransactions.length).toBe(4);
  });

  it('debe obtener transacciones por rango de fechas', () => {
    const yesterday = new Date(testDate);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const tomorrow = new Date(testDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const rangeTransactions = register.getTransactionsByDateRange(yesterday, tomorrow);
    expect(rangeTransactions.length).toBe(4);
  });

  it('debe filtrar devoluciones de clientes', () => {
    const clientReturns = register.getClientReturns();
    expect(clientReturns.length).toBe(1);
    expect(clientReturns[0]).toBe(returnTransactionFromHunter);
  });

  it('debe filtrar devoluciones de mercaderes', () => {
    const merchantReturns = register.getMerchantReturns();
    expect(merchantReturns.length).toBe(1);
    expect(merchantReturns[0]).toBe(returnTransactionFromMerchant);
  });

  it('debe manejar transacciones vacías', () => {
    const emptyRegister = new RegisterCollection();
    expect(emptyRegister.getAll().length).toBe(0);
    expect(emptyRegister.getSales().length).toBe(0);
    expect(emptyRegister.getPurchases().length).toBe(0);
    expect(emptyRegister.getReturns().length).toBe(0);
  });

  it('debe manejar filtros que no devuelven resultados', () => {
    const unknownHunter = new Hunter("999", "Unknown", "Human", "Nowhere");
    expect(register.getTransactionsByClient(unknownHunter).length).toBe(0);
    
    const unknownDate = new Date('2000-01-01');
    expect(register.getTransactionsByDate(unknownDate).length).toBe(0);
    
    const unknownItem = new Weapon("999", "Unknown Weapon", "Description", "Elven Steel", 1, 10);
    expect(register.getTransactionsByItem(unknownItem).length).toBe(0);
  });
});