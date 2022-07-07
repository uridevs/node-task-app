import colors from 'colors';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import { inquirerMenu, pausa, leerInput, mostrarListadoCheckList, listadoTareasBorrar, confirmar } from './helpers/inquirer.js';
import { Tarea } from './models/tarea.js';
import { Tareas } from './models/tareas.js';
 
console.clear();
 
const main = async () => {
  let opt = '';
  const tareas = new Tareas();
  
  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasFromArray( tareasDB );
  }

  do {

    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        const desc = await leerInput('Descripción: ');
        tareas.crearTarea(desc);
      break;

      case '2':
        tareas.listadoCompleto();
      break;

      case '3':
        tareas.listarPendientesCompletadas();
      break;

      case '4':
        tareas.listarPendientesCompletadas(false);
      break;

      case '5':
        const ids = await mostrarListadoCheckList( tareas.listadoArr );
        tareas.toggleCompletadas( ids );
      break;

      case '6':
        const id = await listadoTareasBorrar( tareas.listadoArr);

        if (id !== '0'){
          const ok = await confirmar('¿Está seguro?');
          if (ok){
            tareas.borrarTarea(id);
            console.log(`Tarea borrada correctamente`);
          }
        }
        
        
      break;
  
    }

    guardarDB(tareas.listadoArr)
    if (opt !== '0') await pausa();

  } while (opt !== '0');
};

main();