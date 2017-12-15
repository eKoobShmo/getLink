import {DomicilioInterface} from "./domicilio";

export interface userInfoInterface{
    nombre:string;
    domicilio:DomicilioInterface;
    email?:string;
    telefono:number;
}