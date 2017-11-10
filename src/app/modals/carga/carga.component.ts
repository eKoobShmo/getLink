import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap'
import {FileItem} from "../../models/fileItem";
import {CargaMultimediaService} from "../../services/carga-archivos.service.";

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.scss']
})
export class CargaComponent implements OnInit {

  aboveDropZone:boolean = false;
  permiteCargar:boolean = true;

  archivos:FileItem[]=[];

  constructor(private activeModal:NgbActiveModal,
             private _cargaMultimediaService : CargaMultimediaService) { }

  ngOnInit() {
  }

  archivoSobreDropZone(evento:boolean){
    this.aboveDropZone= evento;
  }

  clearFiles(){
    this.archivos = [];
    this.permiteCargar = true;
  }

  cargarMultimediaFirebase(archivos:FileItem[]){
    this.permiteCargar = false;
    // this._cargaMultimediaService.cargarImagenesFirebase(archivos);
    
  }
  closeModal(){
    this.activeModal.close(this.archivos);
  }

}
