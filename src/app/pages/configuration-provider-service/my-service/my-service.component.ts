import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TrabajosRealizadosComponent} from "../../../modals/trabajos-realizados/trabajos-realizados.component";

@Component({
  selector: 'app-my-service',
  templateUrl: './my-service.component.html',
  styleUrls: ['./my-service.component.scss']
})
export class MyServiceComponent implements OnInit {
    isEdit: boolean = false;
    isUpdating: boolean=false;
    errorNombre: boolean = false;
    errorEmail:boolean=false;
    errorTelefono: boolean = false;
    errorWhats:boolean=false;
    errorCalle: boolean = false;
    errorCP: boolean = false;
    errorColonia: boolean = false;
    errorNumero: boolean = false;

  constructor(private _modalService: NgbModal) { }

  ngOnInit() {
  }

    updateUser() {
        this.isEdit = true;
        this.isUpdating = true;
    }

    cancelEdit(){
        this.isEdit=false;
        this.isUpdating=false;
    }

    openModalTrabajosR(){
      this._modalService.open(TrabajosRealizadosComponent);
    }

}
