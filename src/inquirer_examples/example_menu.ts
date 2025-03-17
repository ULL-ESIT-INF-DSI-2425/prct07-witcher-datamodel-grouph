import inquirer from "inquirer";

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
          "Exit"
        ]
      }
    ]);
    switch (option) {
      case "Manage goods":

      case "Manage merchants":

      case "Manage clients":

      case "Register a transaction":

      case "Generate reports":

      case "Exit":
        return;
    }
  }
}

mainMenu();