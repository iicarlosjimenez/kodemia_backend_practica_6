const fs = require('node:fs')
const nameFile = 'archivo.json'
// Obtener parametros 
const command = process.argv[2]
const koder = process.argv[3]

// Function main 
function main() {
   const fileExists = fs.existsSync(nameFile)

   if (!fileExists) {
      updateFile([])
   }

   switch (command) {
      case 'ls':
         console.log(ls());
         break;

      case 'new':
         if (koder) {
            add(koder)
            console.log('Agregado!');
            console.log(ls());
         }
         else
            console.error('Se requiere de un koder');
         break;

      case 'rm':
         if (koder) {
            if (koder < 0 || koder >= getKoders().length) {
               console.error('Id fuera de rago');
            } 
            else {
               rm(koder)
               console.log('Eliminado!');
               console.log(ls());
            }
         }
         else
            console.error('Se requiere el ID del Koder');
         break;

      case 'rma':
         rma()
         console.log('Eliminados!');
         break;

      default:
         const message = `
Comandos aceptados
- ls
- new [koder]
- rm [id_koder]
- rma
         `
         console.info(message);
         break;
   }
}

// Escribir información
function updateFile(koders) {
   fs.writeFileSync(nameFile, JSON.stringify({ koders: koders }))
}

// Listar Koders
function getKoders() {
   const content = JSON.parse(fs.readFileSync(nameFile, 'utf-8'))
   return content.koders ?? [];
}

// Registrar nuevo koder
function add(koder) {
   const koders = getKoders()
   koders.push(koder)

   updateFile(koders)
}

// Obtener koders
function ls() {
   const koders = getKoders().map((koder, index) => `ID: ${index}, Koder: ${koder}`)
   return koders
}

// Eliminar koder 
function rm(id_koder) {
   const koders = getKoders()
   koders.splice(id_koder, 1)
   updateFile(koders)
}

// Eliminar todos los koders 
function rma() {
   updateFile([])
}

main()
