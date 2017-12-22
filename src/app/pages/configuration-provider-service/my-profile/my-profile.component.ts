import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../../services/user.service';
import {userInfoInterface} from '../../../interfaces/userInfo';
import {ValidationService} from '../../../services/validation.service';
import {Globals} from "../../../services/globals.service";

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
    isEdit: boolean = false;
    isUpdating: boolean = false;
    uid: string;
    email: string;
    fieldEmail: string;
    fieldNombre: string;
    fieldTelefono: string;
    fieldCalle: string;
    fieldColonia: string;
    fieldNumero: number;
    fieldCP: number;
    errorNombre: boolean = false;
    errorTelefono: boolean = false;
    errorCalle: boolean = false;
    errorCP: boolean = false;
    errorColonia: boolean = false;
    errorNumero: boolean = false;
    isProvider: boolean=false;
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
                private _usrService: UserService,
                public _validationService:ValidationService) {

        // obtener uid mediante una promesa y obteniendo el nombre si es que tiene alguno
        this._usrService.isAuthenticated().then((response: any) => {
            this.uid = response.uid;
            if (response.displayName != null) {
                this.infoUser.nombre = response.displayName;
                this.fieldNombre = this.infoUser.nombre;
            }
            if (response.email != null) {
                this.email = response.email;
            }
        });

    }

    ngOnInit() {
        // obtener la informacion que contiene el usuario
        setTimeout(() => {
            this._usrService.getInfoUser(this.uid).subscribe((response: any) => {
                if (response.nombre != null) {
                    this.infoUser.nombre = response.nombre;
                    this.fieldNombre = response.nombre;
                }
                if(response.isProvider!=null && response.isProvider){
                    this.isProvider = true;
                }else{
                    this.isProvider = false;
                }

                this.fieldEmail = this.email;
                if (response.telefono != null) {
                    this.infoUser.telefono = response.telefono;
                    this.fieldTelefono = this.infoUser.telefono.toString();
                }
                if (response.domicilio != null) {
                    this.infoUser.domicilio.calle = response.domicilio.calle;
                    this.fieldCalle = this.infoUser.domicilio.calle;
                    this.infoUser.domicilio.numero = response.domicilio.numero;
                    this.fieldNumero = this.infoUser.domicilio.numero;
                    this.infoUser.domicilio.cp = response.domicilio.cp;
                    this.fieldCP = this.infoUser.domicilio.cp;
                    this.infoUser.domicilio.colonia = response.domicilio.colonia;
                    this.fieldColonia = this.infoUser.domicilio.colonia;
                }

            })
        }, 300)

    }

    updateUser() {
        this.isEdit = true;
        this.isUpdating = true;
    }

    closeModal() {
        this._activeModal.dismiss();
    }

    cancelEdit() {
        this.isEdit = false;
        this.isUpdating = false;
    }

    validateFields(infoUser: userInfoInterface) {
        if (this._validationService.errorInField(this.fieldNombre)) {
            this.errorNombre = true;
        } else {
            infoUser.nombre = this.fieldNombre;
            if (this._validationService.errorInField(this.fieldTelefono)) {
                this.errorTelefono = true;
            } else {
                infoUser.telefono = parseInt(this.fieldTelefono);
                if (this._validationService.errorInField(this.fieldCalle)) {
                    this.errorCalle = true;
                } else {
                    infoUser.domicilio.colonia = this.fieldColonia;
                    if (this._validationService.errorInField(this.fieldNumero)) {
                        this.errorNumero = true;
                    } else {
                        infoUser.domicilio.calle = this.fieldCalle;
                        if (this._validationService.errorInField(this.fieldColonia)) {
                            this.errorColonia = true;
                        } else {
                            infoUser.domicilio.numero = this.fieldNumero;
                            if (this._validationService.errorInField(this.fieldCP)) {
                                this.errorCP = true;
                            } else {
                                infoUser.domicilio.cp = this.fieldCP;
                                infoUser.isProvider = this.isProvider;
                                this.updateInfo(infoUser);
                            }
                        }
                    }
                }
            }
        }

    }

    updateInfo(infoUser: userInfoInterface) {
        this._usrService.updateDataUser(this.uid, infoUser);
        this.isEdit=false;
        this.isUpdating = false;
    }


}
