import { Injectable } from '@angular/core';
import {GalleryComponent} from "../modals/gallery/gallery.component";
import {stringDistance} from "codelyzer/util/utils";
import {MULTIMEDIA} from "../enums/enums";


@Injectable()
export class ModalMultimediaService {

  constructor() { }

   //
  getMultimediaFromArray(attachedList:any[]){
      let arrayImages:object[]=[];

      for(let index = 0; index < attachedList.length; index++){

        if(attachedList[index].tipo == MULTIMEDIA.IMAGE || attachedList[index].tipo == MULTIMEDIA.VIDEO){
          arrayImages.push({
              adjuntoUrl: attachedList[index].adjuntoUrl,
              tipo: attachedList[index].tipo
          })
        }
      }

      return arrayImages;
  }

}
