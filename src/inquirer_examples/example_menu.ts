import inquirer from "inquirer";
import { Inventory } from "../inventory.js";

async function goodsMenu() {
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Goods management",
        choices: [
          "Add a good",
          "Remove a good",
          "Modify a good",
          "List all goods",
          new inquirer.Separator(),
          "Back to main menu",
        ],
      },
    ]);
    switch (action) {
      case "Add a good":

      case "Remove a good":

      case "Modify a good":

      case "List all goods":

      case "Back to main menu":
        return;

      default:
        throw new Error("Invalid action");
    }
  }
}

async function merchantsMenu() {
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Merchant Management:",
        choices: [
          "Add a merchant",
          "Remove a merchant",
          "Modify a merchant",
          "List all merchants",
          new inquirer.Separator(),
          "Back to main menu",
        ],
      },
    ]);

    switch (action) {
      case "Add a merchant":
        break;
      case "Remove a merchant":
        break;
      case "Modify a merchant":
        break;
      case "View merchants":
        break;
      case "Back to main menu":
        return;

      default:
        throw new Error("Invalid action");
    }
  }
}

async function clientsMenu() {
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Client Management:",
        choices: [
          "Add a client",
          "Remove a client",
          "Modify a client",
          "List all clients",
          new inquirer.Separator(),
          "Back to main menu",
        ],
      },
    ]);

    switch (action) {
      case "Add a client":
        break;
      case "Remove a client":
        break;
      case "Modify a client":
        break;
      case "View clients":
        break;
      case "Back to main menu":
        return;

      default:
        throw new Error("Invalid action");
    }
  }
}

async function transactionsMenu() {
  while (true) {
    const { transactionType } = await inquirer.prompt([
      {
        type: "list",
        name: "transactionType",
        message: "Select transaction type:",
        choices: ["Sell to client", "Buy from merchant", "Return item", "Back"],
      },
    ]);

    switch (transactionType) {
      case "Sell to client":
        break;
      case "Buy from merchant":
        break;
      case "Return item":
        break;
      case "Back":
        return;

      default:
        throw new Error("Invalid action");
    }
  }
}

async function reportsMenu() {
  while (true) {
    const { reportType } = await inquirer.prompt([
      {
        type: "list",
        name: "reportType",
        message: "Select a report type:",
        choices: [
          "Stock status",
          "Most sold items",
          "Total income and expenses",
          "Transaction history",
          new inquirer.Separator(),
          "Back",
        ],
      },
    ]);

    switch (reportType) {
      case "Stock status":
        break;
      case "Most sold items":
        break;
      case "Total income and expenses":
        break;
      case "Transaction history":
        break;
      case "Back":
        return;

      default:
        throw new Error("Invalid action");
    }
  }
}

async function mainMenu() {
  while (true) {
    const { option } = await inquirer.prompt([
      {
        type: "list",
        name: "option",
        message: "-- The White Wolf Inn Inventory System --",
        choices: [
          "Manage goods",
          "Manage merchants",
          "Manage clients",
          "Register a transaction",
          "Generate reports",
          new inquirer.Separator(),
          "Exit",
        ],
      },
    ]);
    switch (option) {
      case "Manage goods":
        await goodsMenu();
        break;
      case "Manage merchants":
        await merchantsMenu();
        break;
      case "Manage clients":
        await clientsMenu();
        break;
      case "Register a transaction":
        await transactionsMenu();
        break;
      case "Generate reports":
        await reportsMenu();
        break;
      case "Exit":
        return;
      default:
        throw new Error("Invalid action");
    }
  }
}

mainMenu();
