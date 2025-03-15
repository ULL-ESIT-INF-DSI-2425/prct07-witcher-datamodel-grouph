import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { Merchant, Profession } from "./merchant";
import { read } from "fs";
import { Readline } from "readline/promises";

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
  if (MerchantDB.data.merchants.find((merchant) => merchant.merchant.id === new_merchant.id)) {
    console.log("/// WARNING: El mercader ya existe ///");
    return;
  } else {
    MerchantDB.data.merchants.push({ merchant: new_merchant }); // Agregar usuario
  }
  await MerchantDB.write(); // Guardar cambios en db.json
}

async function RemoveMerchant(remove_id: number) {
  await MerchantDB.read();
  if (MerchantDB.data.merchants.length === 0) {
    console.log("/// WARNING: No hay marchants registrados ///");
    return;
  }

  if (!MerchantDB.data.merchants.find((merchant) => merchant.merchant.id === remove_id)) {
    console.log("/// WARNING: El merchant no existe ///");
    return;
  }
  
  const newNerchants = MerchantDB.data.merchants.filter(
    client => client.merchant.id !== remove_id
  );

  MerchantDB.data.merchants = newNerchants;
  await MerchantDB.write(); 
}


async function GetMerchants() {
  await MerchantDB.read(); // Cargar los datos desde db.json
  MerchantDB.data.merchants.forEach((merchant) => {
    console.log("ID: " + merchant.merchant.id);
    console.log("Name: " + merchant.merchant.name);
    console.log("Profession: " + merchant.merchant.profession);
    console.log("Location: " + merchant.merchant.location);
    console.log("-------------------------------");
  });
}

type MerchantAtributte = "name" | "profession" | "location";

async function ModifyMerchant(modify_id: number, parameter_to_modify: MerchantAtributte, new_value: string | Profession) {
  await MerchantDB.read(); // Cargar los datos desde db.json
  const merchant = MerchantDB.data.merchants.find((merchant) => merchant.merchant.id === modify_id);

  if (MerchantDB.data.merchants.length === 0) {
    console.log("/// WARNING: No hay marchants registrados ///");
    return;
  }
  if (!merchant) {
    console.log("/// WARNING: No se pudo modificar, el merchant no existe ///");
    return;
  }
  switch (parameter_to_modify) {
    case "name":
      merchant.merchant.name = new_value as string;
      break;
    case "profession":
      merchant.merchant.profession = new_value as Profession;
      break;
    case "location":
      merchant.merchant.location = new_value as string;
      break;
  }
  await MerchantDB.write(); // Guardar cambios en db.json
}

async function GetMerchantBy(parameter: MerchantAtributte, value: string | Profession): Promise<{ merchant: Merchant }[] | undefined> {
  await MerchantDB.read(); // Cargar los datos desde db.json
  if (MerchantDB.data.merchants.length === 0) {
    console.log("/// WARNING: No hay marchants registrados ///");
    return;
  }
  let result: { merchant: Merchant }[] = [];
  switch (parameter) {
    case "name":
      result = MerchantDB.data.merchants.filter((merchant) => merchant.merchant.name === value);
      break;
    case "profession":
      result = MerchantDB.data.merchants.filter((merchant) => merchant.merchant.profession === value);
      break;
    case "location":
      result = MerchantDB.data.merchants.filter((merchant) => merchant.merchant.location === value);
      break;
  }

  if (result.length === 0) {
    console.log("/// WARNING: No se encontraron mercaderes con ese parámetro ///");
    return result;
  }
  return result;
}

initMDB();
const Lucien = new Merchant(1, "Lucien", "Druida", "Añaza");
const Russel = new Merchant(2, "Russel", "Herrero", "Añaza");
AddMerchant(Lucien);
AddMerchant(Russel);

ModifyMerchant(20002, "location", "La Laguna");

//GetMerchants();
console.log(GetMerchantBy("profession", "Herrero").then((result) => console.log(result)));
