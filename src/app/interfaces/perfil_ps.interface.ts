import {HORARIO} from "../enums/horario";
import {DomicilioInterface} from "./domicilio";

export interface providerInterface {
    nombre?: string;
    puntuacion?: number;
    telefono?: number;
    horario?: HORARIO;
    direccion?:DomicilioInterface;
    descripcion?:string;
    email?:string;
    fotoUrl?:string;
    trabajosRealizados?:number;
    trabajos?:object;
}