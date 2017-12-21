import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Globals} from "../../services/globals.service";
import {UserService} from "../../services/user.service";
import {userInfoInterface} from "../../interfaces/userInfo";
import {ValidationService} from "../../services/validation.service";
import {timepickerReducer} from "ngx-bootstrap/timepicker/reducer/timepicker.reducer";
import {validate} from "codelyzer/walkerFactory/walkerFn";

@Component({
    selector: 'app-update-info',
    templateUrl: './update-info.component.html',
    styleUrls: ['./update-info.component.scss']
})
export class UpdateInfoComponent implements OnInit {

    @Input() uid;
    isEdit: boolean = false;
    isUpdating: boolean = false;
    errorNombre: boolean = false;
    errorTelefono: boolean = false;
    errorCalle: boolean = false;
    errorCP: boolean = false;
    errorColonia: boolean = false;
    errorNumero: boolean = false;

    infoUser: userInfoInterface = {
        nombre: '',
        domicilio: {
            cp: null,
            calle: '',
            colonia: '',
            numero: null
        },
        telefono: null,
        isProvider:false
    };


    constructor(private _activeModal: NgbActiveModal,
                private _userService: UserService,
                public _validationService: ValidationService) {


        this._userService.isAuthenticated().then((response: any) => {
            if(response.displayName!=null){
                this.infoUser.nombre = response.displayName;
            }

        })

    }

    ngOnInit() {

        this._userService.getInfoUser(this.uid).subscribe((result: any) => {

            if (result != null) {

                this.infoUser.domicilio.calle = result.domicilio.calle;
                this.infoUser.domicilio.colonia = result.domicilio.colonia;
                this.infoUser.domicilio.cp = result.domicilio.cp;
                this.infoUser.domicilio.numero = result.domicilio.numero;
                this.infoUser.telefono = result.telefono;
                this.infoUser.nombre = result.nombre

            } else {

                this.infoUser.nombre = "";
                this.infoUser.telefono = null;
                this.infoUser.domicilio.calle = "";
                this.infoUser.domicilio.cp = null;
                this.infoUser.domicilio.colonia = "";
                this.infoUser.domicilio.numero = null;

            }
        })

    }

    closeModal() {
        this._activeModal.dismiss();
    }

    updateUser() {
        this.isEdit = true;
        this.isUpdating = true;
    }

    validateFields(infoUser: userInfoInterface) {
        if (infoUser.nombre == "") {
            this.errorNombre = true;
        } else {
            if (infoUser.telefono == null) {
                this.errorTelefono = true;
            } else {
                if (infoUser.domicilio.colonia == "") {
                    this.errorColonia = true;
                } else {
                    if (infoUser.domicilio.calle == "") {
                        this.errorCalle = true;
                    } else {
                        if (infoUser.domicilio.numero == null) {
                            this.errorNumero = true;
                        } else {
                            if (infoUser.domicilio.cp == null) {
                                this.errorCP = true;
                            } else {
                                this.updateInfo(infoUser);
                            }
                        }
                    }
                }
            }
        }

    }


    updateInfo(infoUser: userInfoInterface) {

        this._userService.updateUserInfo(this.uid, infoUser);
        this._activeModal.close(infoUser)
    }


}
