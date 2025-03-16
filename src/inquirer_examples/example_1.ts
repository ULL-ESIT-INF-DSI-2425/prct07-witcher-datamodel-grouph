import inquirer from 'inquirer';


// Funciones con parámetros
const funciones: { [key: string]: (nombre: string) => void } = {
    Red: (nombre: string) => console.log(`Hola ${nombre}, ¡ROJO es intenso!`),
    Blue: (nombre: string) => console.log(`Hola ${nombre}, el AZUL es tranquilo.`),
    Green: (nombre: string) => console.log(`Hola ${nombre}, VERDE es naturaleza.`),
};
  
  inquirer.prompt([
    {
      type: 'input',
      name: 'nombre',
      message: '¿Cuál es tu nombre?',
    },
    {
      type: 'list',
      name: 'color',
      message: 'Elige un color:',
      choices: ['Red', 'Blue', 'Green'],
    }
  ]).then((answers) => {
    const { nombre, color } = answers;
    
    if (funciones[color]) {
      funciones[color](nombre); // Pasamos el nombre como parámetro
    } else {
      console.log("Color no válido.");
    }
  });