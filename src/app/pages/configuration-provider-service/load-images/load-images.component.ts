import { Component, OnInit } from '@angular/core';
import {TrabajosRealizadosComponent} from "../../../modals/trabajos-realizados/trabajos-realizados.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CalificarServicioComponent} from "../../../modals/calificar-servicio/calificar-servicio.component";

@Component({
  selector: 'app-load-images',
  templateUrl: './load-images.component.html',
  styleUrls: ['./load-images.component.scss']
})
export class LoadImagesComponent implements OnInit {

  constructor(private _modalService: NgbModal) { }

  ngOnInit() {
  }

  openModalCalificarServicio(){
      this._modalService.open(CalificarServicioComponent);
  }
}
