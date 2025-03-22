import inquirer from "inquirer";
import chalk from "chalk";
import {
  displayTitle,
  pressEnterToContinue,
  showError,
} from "../utils/menuUtils.js";
import { mainMenu } from "../mainMenu.js";

import { Inventory } from "../../inventory.js";
import { ClientCollection } from "../../collections/clientCollection.js";
import { MerchantCollection } from "../../collections/merchantCollection.js";
import { ItemCollection } from "../../collections/itemCollection.js";
import { Hunter } from "../../hunter.js";
import { Merchant } from "../../merchant.js";
import { Item } from "../../item.js";

import { clientDB } from "../../inquirer/clientMenu/clientMenu.js";
import { merchantDB } from "../../inquirer/merchantMenu/merchantMenu.js";
import { itemDB } from "../../inquirer/goodsMenu/goodsMenu.js";

// Inicializar colecciones
const clientCollection = clientDB;
const merchantCollection = merchantDB;
const itemCollection = itemDB;
const inventory = new Inventory(
  clientCollection,
  merchantCollection,
  itemCollection
);

console.log(inventory.getAllTransactions());

export function transactionsMenu(): void {
  displayTitle("Register Transaction");

  inquirer
    .prompt([
      {
        type: "list",
        name: "option",
        message: chalk.white.underline("► Select an option:"),
        choices: getTransactionChoices(),
        loop: false,
      },
    ])
    .then(({ option }) => {
      if (option === "back") return mainMenu();
      handleTransaction(option);
    });
}

function getTransactionChoices() {
  return [
    { name: chalk.green("Sell to Client"), value: "sell" },
    { name: chalk.blue("Buy from Merchant"), value: "buy" },
    { name: chalk.red("Return Item"), value: "return" },
    { name: chalk.cyan("List All Transactions"), value: "listAll" },
    { name: chalk.cyan("List Sales Transactions"), value: "listSales" },
    { name: chalk.cyan("List Purchase Transactions"), value: "listPurchase" },
    { name: chalk.cyan("List Return Transactions"), value: "listReturn" },
    {
      name: chalk.magenta("Print Transactions by Client"),
      value: "printByClient",
    },
    {
      name: chalk.magenta("Print Transactions by Merchant"),
      value: "printByMerchant",
    },
    { name: chalk.white("Show Net Crowns"), value: "netCrowns" },
    new inquirer.Separator(),
    { name: chalk.yellow("↩ Return to Main Menu"), value: "back" },
  ];
}

function handleTransaction(action: string): void {
  const actions: Record<string, () => void> = {
    sell: handleSell,
    buy: handleBuy,
    return: handleReturn,
    listAll: listAllTransactions,
    listSales: listSalesTransactions,
    listPurchase: listPurchaseTransactions,
    listReturn: listReturnTransactions,
    printByClient: () => {
      inventory.printTransactionsByClient();
      pressEnterToContinue().then(transactionsMenu);
    },
    printByMerchant: () => {
      inventory.printTransactionsByMerchant();
      pressEnterToContinue().then(transactionsMenu);
    },
    netCrowns: () => {
      console.log(chalk.green(`Net crowns: ${inventory.getNetCrowns()}`));
      pressEnterToContinue().then(transactionsMenu);
    },
  };

  if (actions[action]) {
    actions[action]();
  } else {
    showError("Invalid action");
  }
}

function handleSell(): void {
  const clients = clientCollection.getClients();
  const items = itemCollection.getItems();

  if (clients.length === 0 || items.length === 0) {
    showError("No clients or items available for sale.");
    return transactionsMenu();
  }

  inquirer
    .prompt([
      {
        type: "list",
        name: "clientId",
        message: "Select a client:",
        choices: clients.map((c) => ({ name: c.name, value: c.id })),
      },
      {
        type: "checkbox",
        name: "itemIds",
        message: "Select items to sell:",
        choices: items.map((i) => ({ name: i.name, value: i.id })),
      },
    ])
    .then(({ clientId, itemIds }) => {
      const client = clientCollection.getClientById(clientId);
      const selectedItems = itemIds.map((id: string) =>
        itemCollection.getItemBy("id", id)
      );
      inventory.recordSale(client as Hunter, selectedItems);
      console.log(chalk.green("Transaction recorded successfully."));
      transactionsMenu();
    });
}

function handleBuy(): void {
  const merchants = merchantCollection.getMerchants();
  const items = itemCollection.getItems();

  if (merchants.length === 0 || items.length === 0) {
    showError("No merchants or items available for purchase.");
    return transactionsMenu();
  }

  inquirer
    .prompt([
      {
        type: "list",
        name: "merchantId",
        message: "Select a merchant:",
        choices: merchants.map((m) => ({ name: m.name, value: m.id })),
      },
      {
        type: "checkbox",
        name: "itemIds",
        message: "Select items to buy:",
        choices: items.map((i) => ({ name: i.name, value: i.id })),
      },
    ])
    .then(({ merchantId, itemIds }) => {
      const merchant = merchantCollection.getMerchantById(merchantId);
      const selectedItems = itemIds.map((id: string) =>
        itemCollection.getItemBy("id", id)
      );
      inventory.recordPurchase(merchant as Merchant, selectedItems);
      console.log(chalk.green("Transaction recorded successfully."));
      transactionsMenu();
    });
}

function handleReturn(): void {
  inquirer
    .prompt([
      {
        type: "list",
        name: "entityType",
        message: "Is the return from a client or a merchant?",
        choices: [
          { name: "Client", value: "client" },
          { name: "Merchant", value: "merchant" },
        ],
      },
    ])
    .then(({ entityType }) => {
      if (entityType === "client") {
        const clients = clientCollection.getClients();
        inquirer
          .prompt([
            {
              type: "list",
              name: "clientId",
              message: "Select a client:",
              choices: clients.map((c) => ({ name: c.name, value: c.id })),
            },
          ])
          .then(({ clientId }) => {
            const entity = clientCollection.getClientById(clientId);
            if (!entity) {
              showError("Invalid entity selected.");
              return transactionsMenu();
            }
            processReturn(entity);
          });
      } else {
        const merchants = merchantCollection.getMerchants();
        inquirer
          .prompt([
            {
              type: "list",
              name: "merchantId",
              message: "Select a merchant:",
              choices: merchants.map((m) => ({ name: m.name, value: m.id })),
            },
          ])
          .then(({ merchantId }) => {
            const entity = merchantCollection.getMerchantById(merchantId);
            if (!entity) {
              showError("Invalid entity selected.");
              return transactionsMenu();
            }
            processReturn(entity);
          });
      }
    });
}

function processReturn(entity: Hunter | Merchant): void {
  const items = itemCollection.getItems();
  inquirer
    .prompt([
      {
        type: "checkbox",
        name: "itemIds",
        message: "Select items to return:",
        choices: items.map((i) => ({ name: i.name, value: i.id })),
      },
      {
        type: "input",
        name: "reason",
        message: "Reason for return:",
      },
    ])
    .then(({ itemIds, reason }) => {
      const selectedItems = itemIds.map((id: string) =>
        itemCollection.getItemBy("id", id)
      );
      inventory.recordReturn(entity, selectedItems, reason);
      console.log(chalk.green("Return transaction recorded successfully."));
      transactionsMenu();
    });
}

function listAllTransactions(): void {
  displayTitle("All Transactions");
  const transactions = inventory.getAllTransactions();
  if (transactions.length === 0) {
    console.log(chalk.yellow("No transactions found."));
  } else {
    console.table(transactions);
  }
  pressEnterToContinue().then(transactionsMenu);
}

function listSalesTransactions(): void {
  displayTitle("Sales Transactions");
  const transactions = inventory.getSales();
  if (transactions.length === 0) {
    console.log(chalk.yellow("No sales transactions found."));
  } else {
    console.table(transactions);
  }
  pressEnterToContinue().then(transactionsMenu);
}

function listPurchaseTransactions(): void {
  displayTitle("Purchase Transactions");
  const transactions = inventory.getPurchases();
  if (transactions.length === 0) {
    console.log(chalk.yellow("No purchase transactions found."));
  } else {
    console.table(transactions);
  }
  pressEnterToContinue().then(transactionsMenu);
}

function listReturnTransactions(): void {
  displayTitle("Return Transactions");
  const transactions = inventory.getReturns();
  if (transactions.length === 0) {
    console.log(chalk.yellow("No return transactions found."));
  } else {
    console.table(transactions);
  }
  pressEnterToContinue().then(transactionsMenu);
}
