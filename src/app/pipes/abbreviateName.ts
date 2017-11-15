import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abbreviateName'
})
export class AbbreviateNamePipe implements PipeTransform {

  transform(value: string): string {
    let nombre:string="";
    let contador:number=0;
    for (let i=0; i<value.length ; i++) {
        if(contador>8){
          nombre+=" ...";
          break;
        }else{
            nombre+=value[i];
            contador++;
        }
    }
    return nombre;
  }

}
