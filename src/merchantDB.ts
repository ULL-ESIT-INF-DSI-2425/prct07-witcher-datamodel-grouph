import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { Merchant } from "./merchant";

type MerchantDataBaseSchema = { merchants: { merchant: Merchant }[] };

const adapter = new JSONFile<MerchantDataBaseSchema>("Merchantdb.json");
const mdbs: MerchantDataBaseSchema = { merchants: [] };
const MerchantDB = new Low(adapter, mdbs);

async function initMDB() {
  await MerchantDB.read(); // Cargar datos desde db.json

  // Si la base de datos está vacía, establece valores por defecto
  MerchantDB.data ||= { merchants: [] };

  await MerchantDB.write(); // Guardar cambios en db.json
}

async function AddMerchant(new_merchant: Merchant) {
  await MerchantDB.read(); // Asegurarse de que los datos están actualizados
  if (
    MerchantDB.data.merchants.find(
      (merchant) => merchant.merchant.id === new_merchant.id,
    )
  ) {
    console.log("/// WARNING: El usuario ya existe ///");
    return;
  } else {
    MerchantDB.data.merchants.push({ merchant: new_merchant }); // Agregar usuario
  }
  await MerchantDB.write(); // Guardar cambios en db.json
}

async function GetMerchants() {
  await MerchantDB.read(); // Cargar los datos desde db.json
  console.log(MerchantDB.data.merchants); // Mostrar todos los mercaderes[]
}

initMDB();
const Lucien = new Merchant(1, "Lucien", "Druida", "Añaza");
const Russel = new Merchant(2, "Russel", "Herrero", "Añaza");
AddMerchant(Lucien);
AddMerchant(Russel);
GetMerchants();
