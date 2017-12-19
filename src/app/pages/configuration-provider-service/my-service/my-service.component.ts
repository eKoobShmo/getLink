import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

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

  constructor(private _activeModal:NgbActiveModal) { }

  ngOnInit() {
  }

    updateUser() {
        this.isEdit = true;
        this.isUpdating = true;
    }

    closeModal() {
        this._activeModal.dismiss();
    }

    cancelEdit(){
        this.isEdit=false;
        this.isUpdating=false;
    }

}
