import { v4 as uuidv4 } from 'uuid';

class Tarea {
    id = '';
    desc = '';
    completadoEn = null

    constructor( desc, completadoEn=null ){

        this.id = uuidv4();
        this.desc = desc;
        this.completadoEn = completadoEn

    }
}

export { Tarea };