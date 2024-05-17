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

      case 'add':
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
            if (rm(koder)) {
               console.log('Eliminado!');
               console.log(ls());
            } else {
               console.error('Koder no encontrado');
               console.log(ls());
            }
         }
         else
            console.error('Se requiere el ID del Koder');
         break;

      case 'reset':
         reset()
         console.log('Eliminados!');
         break;

      default:
         const message = `
Comandos aceptados
- ls
- add [koder]
- rm [id_koder]
- reset
         `
         console.info(message);
         break;
   }
}

// Escribir inforesetción
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
   const koders = getKoders()
   return koders
}

// Eliminar koder 
function rm(name_koder) {
   const koders = getKoders()
   const id_koder = koders.indexOf(name_koder)
   if (id_koder >= 0) {
      koders.splice(id_koder, 1)
      updateFile(koders)
      return true
   } else {
      return false      
   }
}

// Eliminar todos los koders 
function reset() {
   updateFile([])
}

main()
