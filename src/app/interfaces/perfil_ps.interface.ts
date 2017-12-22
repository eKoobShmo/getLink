import {DomicilioInterface} from "./domicilio";
import {horarioInterface} from './horario';

export interface providerInterface {
    nombre?: string;
    titulo?:string;
    puntuacion?: number;
    telefono?: number;
    horario: horarioInterface;
    direccion:DomicilioInterface;
    descripcion?:string;
    email?:string;
    fotoUrl?:string;
    trabajosRealizados?:number;
}