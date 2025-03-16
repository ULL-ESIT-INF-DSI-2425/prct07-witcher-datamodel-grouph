import inquirer from 'inquirer';

// Opciones dinámicas para la segunda lista según la primera selección
const opcionesSecundarias = {
  Frutas: ['Manzana 🍎', 'Banana 🍌', 'Uva 🍇'],
  Verduras: ['Zanahoria 🥕', 'Lechuga 🥬', 'Brócoli 🥦'],
  Postres: ['Pastel 🎂', 'Helado 🍦', 'Galletas 🍪']
};

async function main() {
  try {
    // Primera lista: categoría
    const primeraRespuesta: { categoria: keyof typeof opcionesSecundarias } = await inquirer.prompt([
      {
        type: 'list',
        name: 'categoria',
        message: 'Selecciona una categoría:',
        choices: ['Frutas', 'Verduras', 'Postres']
      }
    ]);

    // Obtener opciones para la segunda lista
    const opciones: string[] = opcionesSecundarias[primeraRespuesta.categoria];

    // Segunda lista: elemento específico
    const segundaRespuesta = await inquirer.prompt([
      {
        type: 'list',
        name: 'elemento',
        message: `Elige un ${primeraRespuesta.categoria.toLowerCase()}:`,
        choices: opciones
      }
    ]);

    // Resultado final
    console.log(`
      🛒 Seleccionaste: 
      Categoría: ${primeraRespuesta.categoria}
      Elemento: ${segundaRespuesta.elemento}
    `);

  } catch (error) {
    console.error('Error:', error);
  }
}

main();