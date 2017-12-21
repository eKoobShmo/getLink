import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'formatDate'
})

export class FormatDatePipe implements PipeTransform {
    days:string[] = [
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
        "Domingo"
    ];

    months:string[] = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
    ];

    transform(dateValue: string): string {
        let date = new Date(dateValue);
        let newDate = new Date();
        let fecha:string;
        return fecha = "Comentó este servicio el día:  "+newDate.toLocaleDateString() + " a las " + newDate.getHours() + ":" +  newDate.getMinutes();
        // return date.getDay() + " de " + this.months[date.getMonth()] + " del " + date.getFullYear() + " a las " + date.getHours() + ":" +  date.getMinutes();;
    }


}