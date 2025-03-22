// testItemCollection.ts

import { ItemCollection } from "../collections/itemCollection.js";
import { Armor, Weapon, Potion, GenericMaterial, Effect } from "../item.js";

// Dummy factory: No se usará para la creación de items, ya que se usan los métodos estáticos de cada clase.
// Se define para cumplir la firma requerida por el constructor de ItemCollection.
const dummyFactory = (
  id: string,
  name: string,
  description: string,
  material: GenericMaterial,
  weight: number,
  price: number,
) => {
  // Por defecto se crea un Armor; sin embargo, no se usará.
  return Armor.createArmor(
    Number(id.replace("A-", "")) || 0,
    name,
    description,
    "Leather",
    weight,
    price,
  );
};

// Instanciamos la colección
const collection = new ItemCollection(dummyFactory);

// ----- Agregar items utilizando los métodos de creación de cada clase -----

// Creamos una armadura
const armor1 = Armor.createArmor(
  1,
  "Armadura de Cuero",
  "Protección ligera de cuero curtido",
  "Leather",
  10,
  120,
);
collection.addItem(armor1);

// Creamos un arma
const weapon1 = Weapon.createWeapon(
  1,
  "Espada Larga",
  "Espada de acero forjado a mano",
  "Steel",
  5,
  200,
);
collection.addItem(weapon1);

// Creamos una poción
const potion1 = Potion.createPotion(
  1,
  "Poción de Regeneración",
  "Restaura vitalidad con el tiempo",
  "Celandine Flower",
  1,
  50,
  "Vitality Regeneration" as Effect,
);
collection.addItem(potion1);

// Agregamos otro arma
const weapon2 = Weapon.createWeapon(
  2,
  "Hacha de Batalla",
  "Arma pesada de doble filo",
  "Meteoric Steel",
  8,
  350,
);
collection.addItem(weapon2);

// Intento de agregar un item con ID duplicado (usando el ID generado internamente)
console.log("\nIntento de agregar item con ID duplicado:");
collection.addItem(weapon1); // Este ya existe, se avisará por consola

// Mostrar items actuales en la colección
console.log("\nItems actuales en la colección:");
console.table(
  collection.getItems().map((item) => ({
    ID: item.id,
    Name: item.name,
    Description: item.description,
    Material: item.material,
    Weight: item.weight,
    Price: item.price,
  })),
);

// ----- Pruebas de filtrado -----

// Filtrar por nombre (insensible a mayúsculas/minúsculas)
console.log("\nFiltrando items por nombre que incluyan 'espada':");
collection.getItemsByName("espada");

// Filtrar por descripción
console.log("\nFiltrando items por descripción que incluyan 'protección':");
collection.getItemsByDescription("protección");

// Filtrar por tipo "Potion"
console.log('\nFiltrando items por tipo "Potion":');
collection.getItemsByType("Potion");

// ----- Pruebas de ordenación -----

// Ordenar por nombre de forma ascendente
console.log("\nOrdenando items por nombre (ascendente):");
collection.sortItemsByName(true);

// Ordenar por precio de forma descendente
console.log("\nOrdenando items por precio (descendente):");
collection.sortItemsByPrice(false);

// ----- Pruebas de modificación -----
// Actualizar el precio del item con ID del arma "Espada Larga"
console.log(
  "\nModificando el precio del item con ID '" + weapon1.id + "' a 250:",
);
collection.modifyItem(weapon1.id, "price", 250);
// Se filtra por ID para visualizar el cambio
collection.getItemBy("id", weapon1.id);

// ----- Pruebas de eliminación -----
// Eliminar el item con ID del item poción
console.log("\nEliminando el item con ID '" + potion1.id + "':");
collection.removeItem(potion1.id);

// Mostrar items actuales en la colección
console.log("\nItems actuales en la colección:");
console.table(
  collection.getItems().map((item) => ({
    ID: item.id,
    Name: item.name,
    Description: item.description,
    Material: item.material,
    Weight: item.weight,
    Price: item.price,
  })),
);
