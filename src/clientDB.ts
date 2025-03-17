import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { Hunter, Race } from "./hunter.js";

type ClientDataBaseSchema = { clients: { hunter: Hunter }[] };

const adapter = new JSONFile<ClientDataBaseSchema>("Clientdb.json");
const cdbs: ClientDataBaseSchema = { clients: [] };
const ClientDB = new Low(adapter, cdbs);

async function initHDB() {
  await ClientDB.read(); // Cargar datos desde db.json

  // Si la base de datos está vacía, establece valores por defecto
  ClientDB.data ||= { clients: [] };

  await ClientDB.write(); // Guardar cambios en db.json
}

async function AddClient(new_hunter: Hunter) {
  await ClientDB.read(); // Asegurarse de que los datos están actualizados
  if (
    ClientDB.data.clients.find((hunter) => hunter.hunter.id === new_hunter.id)
  ) {
    console.log("/// WARNING: El cazador ya existe ///");
    return;
  } else {
    ClientDB.data.clients.push({ hunter: new_hunter }); // Agregar usuario
  }
  await ClientDB.write(); // Guardar cambios en db.json
}

async function RemoveClient(remove_id: number) {
  await ClientDB.read();
  if (ClientDB.data.clients.length === 0) {
    console.log("/// WARNING: No hay cazadores registrados ///");
    return;
  }

  if (!ClientDB.data.clients.find((hunter) => hunter.hunter.id === remove_id)) {
    console.log("/// WARNING: El cazador no existe ///");
    return;
  }

  const newClients = ClientDB.data.clients.filter(
    (client) => client.hunter.id !== remove_id,
  );

  ClientDB.data.clients = newClients;
  await ClientDB.write();
}

async function GetClients() {
  await ClientDB.read(); // Cargar los datos desde db.json
  ClientDB.data.clients.forEach((hunter) => {
    console.log("ID: " + hunter.hunter.id);
    console.log("Name: " + hunter.hunter.name);
    console.log("Race: " + hunter.hunter.race);
    console.log("Location: " + hunter.hunter.location);
    console.log("-------------------------------");
  });
}

type ClientAtributte = "name" | "race" | "location";

async function ModifyClient(
  id: number,
  atributte: ClientAtributte,
  value: string | Race,
) {
  await ClientDB.read(); // Cargar los datos desde db.json
  if (ClientDB.data.clients.length === 0) {
    console.log("/// WARNING: No hay cazadores registrados ///");
    return;
  }
  const hunter = ClientDB.data.clients.find(
    (hunter) => hunter.hunter.id === id,
  );

  if (!hunter) {
    console.log("/// WARNING: El cazador no existe ///");
    return;
  }

  switch (atributte) {
    case "name":
      hunter.hunter.name = value as string;
      break;
    case "race":
      hunter.hunter.race = value as Race;
      break;
    case "location":
      hunter.hunter.location = value as string;
      break;
  }
  await ClientDB.write();
}

async function GetClientBy(
  parameter: ClientAtributte,
  value: string | Race,
): Promise<{ hunter: Hunter }[] | undefined> {
  await ClientDB.read(); // Cargar los datos desde db.json
  return ClientDB.data.clients.filter(
    (hunter) => hunter.hunter[parameter] === value,
  );
}

initHDB();
const Gerald = new Hunter(3, "Gerald de Rivia", "Human", "YoKeSeHermano");
const Yenne = new Hunter(2, "Yennefer de Vengerberg", "Elf", "Añaza");
AddClient(Gerald);
AddClient(Yenne);

RemoveClient(30002);

// GetClients();
GetClientBy("race", "Humano").then((hunters) => {
  console.log(hunters);
});
