import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TrabajosRealizadosComponent} from "../../../modals/trabajos-realizados/trabajos-realizados.component";
import {HORARIO} from "../../../enums/horario";
import {ValidationService} from "../../../services/validation.service";
import {userProviderService} from "../../../services/userProvider.service";

@Component({
    selector: 'app-my-service',
    templateUrl: './my-service.component.html',
    styleUrls: ['./my-service.component.scss']
})
export class MyServiceComponent implements OnInit {
    isEdit: boolean = false;
    isUpdating: boolean = false;
    HORARIO: any = HORARIO;
    fieldTitulo: string;
    fieldDescripcion: string;


    errorTitulo: boolean = false;
    errorDescripcion: boolean = false;


    constructor(private _modalService: NgbModal,
                private _validationService:ValidationService,
                private _userProviderService:userProviderService) {
    }

    ngOnInit() {
    }

    verifyFields(titulo:string,descripcion:string,horario:HORARIO) {
      if(this._validationService.errorInField(titulo)){
          this.errorTitulo = true;
      }else{
          if(this._validationService.errorInField(descripcion)){
              this.errorDescripcion = true;
          }else{
              this.goToRegisterProviderService(titulo,descripcion,horario);
          }
      }
    }

    goToRegisterProviderService(titulo:string,descripcion:string,horario:HORARIO){
        debugger;
        this._userProviderService.registerProviderService(titulo, descripcion,horario);
    }

    updateUser() {
        this.isEdit = true;
        this.isUpdating = true;
    }

    cancelEdit() {
        this.isEdit = false;
        this.isUpdating = false;
    }

    openModalTrabajosR() {
        this._modalService.open(TrabajosRealizadosComponent);
    }

}
