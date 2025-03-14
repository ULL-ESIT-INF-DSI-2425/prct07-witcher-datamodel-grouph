import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { Hunter } from "./hunter";

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

async function GetClients() {
  await ClientDB.read(); // Cargar los datos desde db.json
  console.log(ClientDB.data.clients); // Mostrar todos los clientes
}

initHDB();
const Gerald = new Hunter(3, "Gerald de Rivia", "Humano", "YoKeSeHermano");
const Yenne = new Hunter(2, "Yennefer de Vengerberg", "Elfo", "Añaza");
AddClient(Gerald);
AddClient(Yenne);
GetClients();
