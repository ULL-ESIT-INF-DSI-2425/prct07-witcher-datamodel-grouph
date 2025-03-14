import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { Item, Armor, Weapon, Potion } from "./item";

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
  if (
    ItemDB.data.items.find((item) => item.item.getID() === newItem.getID())
  ) {
    console.log("/// WARNING: El item ya existe ///");
    return;
  } else {
    ItemDB.data.items.push({ item: newItem }); // Agregar usuario
  }
  await ItemDB.write(); // Guardar cambios en db.json
}

async function Getitems() {
  await ItemDB.read(); // Cargar los datos desde db.json
  console.log(ItemDB.data.items); // Mostrar todos los clientes
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
AddItem(CotaDeMalla); 
AddItem(EsenciaVampirica);

Getitems();
