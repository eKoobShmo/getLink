import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../../services/user.service";
import {userInfoInterface} from "../../../interfaces/userInfo";

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
    infoUser: userInfoInterface = {
        nombre: "",
        domicilio: {
            cp: null,
            calle: "",
            colonia: "",
            numero: null
        },
        telefono: null
    };

    constructor(private _activeModal: NgbActiveModal,
                private _usrService: UserService) {

        // obtener uid mediante una promesa
        this._usrService.isAuthenticated().then((response: any) => {
            this.uid = response.uid;
            if (response.displayName != null) {
                this.infoUser.nombre = response.displayName;
                this.fieldNombre = this.infoUser.nombre;
            }
            if(response.email!=null){
                this.email = response.email;
            }
        });

    }

    ngOnInit() {
        // obtener la informacion que contiene el usuario
        setTimeout(() => {
            this._usrService.getInfoUser(this.uid).subscribe((response: any) => {
                this.fieldEmail = this.email;
                this.infoUser.telefono = response.telefono;
                this.fieldTelefono = this.infoUser.telefono.toString();
                this.infoUser.domicilio.calle=response.domicilio.calle;
                this.fieldCalle = this.infoUser.domicilio.calle;
                this.infoUser.domicilio.numero=response.domicilio.numero;
                this.fieldNumero = this.infoUser.domicilio.numero;
                this.infoUser.domicilio.cp=response.domicilio.cp;
                this.fieldCP = this.infoUser.domicilio.cp;
                this.infoUser.domicilio.colonia=response.domicilio.colonia;
                this.fieldColonia = this.infoUser.domicilio.colonia;
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
}
