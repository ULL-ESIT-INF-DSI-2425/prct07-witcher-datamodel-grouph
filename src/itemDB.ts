import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { Item, Armor, Weapon, Potion, GenericMaterial } from "./item.js";

type ItemDataBaseSchema = { items: { item: Item }[] };

const adapter = new JSONFile<ItemDataBaseSchema>("Itemdb.json");
const cdbs: ItemDataBaseSchema = { items: [] };
const ItemDB = new Low(adapter, cdbs);

async function initIDB() {
  await ItemDB.read(); // Cargar datos desde db.json

  // Si la base de datos está vacía, establece valores por defecto
  ItemDB.data ||= { items: [] };

  await ItemDB.write(); // Guardar cambios en db.json
}

async function AddItem(newItem: Item) {
  await ItemDB.read(); // Asegurarse de que los datos están actualizados
  if (ItemDB.data.items.find((item) => item.item.id === newItem.id)) {
    console.log("/// WARNING: El item ya existe ///");
    return;
  } else {
    ItemDB.data.items.push({ item: newItem });
  }
  await ItemDB.write();
}

async function RemoveItem(remove_id: number) {
  await ItemDB.read();
  if (ItemDB.data.items.length === 0) {
    console.log("/// WARNING: No hay items registrados ///");
    return;
  }

  if (!ItemDB.data.items.find((item) => item.item.id === remove_id)) {
    console.log("/// WARNING: El item no existe ///");
    return;
  }

  const newitems = ItemDB.data.items.filter(
    (client) => client.item.id !== remove_id,
  );

  ItemDB.data.items = newitems;
  await ItemDB.write();
}

async function Getitems() {
  await ItemDB.read(); // Cargar los datos desde db.json
  ItemDB.data.items.forEach((item) => {
    console.log("ID: " + item.item.id);
    console.log("Name: " + item.item.name);
    console.log("Description: " + item.item.description);
    console.log("Material: " + item.item.material);
    console.log("Weight: " + item.item.weight);
    console.log("Price: " + item.item.price);
    console.log("-------------------------------");
  });
}

type ItemAtributte = "name" | "description" | "material" | "weight" | "price";

async function ModifyItem(
  id: number,
  attribute: ItemAtributte,
  value: string | number | GenericMaterial,
) {
  await ItemDB.read();
  if (ItemDB.data.items.length === 0) {
    console.log("/// WARNING: No hay items registrados ///");
    return;
  }
  const item = ItemDB.data.items.find((item) => item.item.id === id);
  if (!item) {
    console.log("/// WARNING: El item no existe ///");
    return;
  }
  switch (attribute) {
    case "name":
      item.item.name = value as string;
      break;
    case "description":
      item.item.description = value as string;
      break;
    case "material":
      item.item.material = value as GenericMaterial;
      break;
    case "weight":
      item.item.weight = value as number;
      break;
    case "price":
      item.item.price = value as number;
      break;
  }
  await ItemDB.write();
}

async function GetItemBy(
  parametro: ItemAtributte,
  value: string | number | GenericMaterial,
  order: "asc" | "desc" = "asc",
): Promise<{ item: Item }[] | undefined> {
  await ItemDB.read();
  const items = ItemDB.data.items.filter(
    (item) => item.item[parametro] === value,
  );
  if (items.length === 0) {
    console.log("/// WARNING: No se encontraron items ///");
    return;
  }
  // Ordenar items
  if (typeof value === "string") {
    if (order === "asc") {
      items.sort((a, b) => a.item.name.localeCompare(b.item.name));
    }
    if (order === "desc") {
      items.sort((a, b) => b.item.name.localeCompare(a.item.name));
    }
  }
  if (typeof value === "number") {
    if (order === "asc") {
      items.sort((a, b) => a.item.price - b.item.price);
    }
    if (order === "desc") {
      items.sort((a, b) => b.item.price - a.item.price);
    }
  }

  return items;
}

initIDB();
const Excalibur = new Weapon(
  1,
  "Excalibur",
  "Espada legendaria",
  "Acero",
  10,
  1000,
);
const EspadaMaestra = new Weapon(
  5,
  "Espada Maestra",
  "Espada legendaria",
  "Acero",
  10,
  5000,
);
const CotaDeMalla = new Armor(
  2,
  "Cota de malla",
  "Armadura de placas",
  "Malla de acero",
  20,
  2000,
);
const EsenciaVampirica = new Potion(
  3,
  "Sangre de ghoul",
  "Poción de regeneración",
  "Sangre de ghoul",
  5,
  500,
  "Regeneración de vitalidad",
);

AddItem(Excalibur);
AddItem(EspadaMaestra);
AddItem(CotaDeMalla);
AddItem(EsenciaVampirica);

RemoveItem(2);

// Getitems();
console.log("Items ordenados por precio de forma ascendente");
GetItemBy("material", "Acero", "asc").then((items) => {
  items?.forEach((item) => {
    console.log("ID: " + item.item.id);
    console.log("Name: " + item.item.name);
    console.log("Description: " + item.item.description);
    console.log("Material: " + item.item.material);
    console.log("Weight: " + item.item.weight);
    console.log("Price: " + item.item.price);
    console.log("-------------------------------");
  });
});
