import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {providerInterface} from "../../interfaces/perfil_ps.interface";
import {userProviderService} from "../../services/userProvider.service";
import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from "angularfire2/auth";
import {UserService} from "../../services/user.service";
import {userInfoInterface} from "../../interfaces/userInfo";
import {UpdateInfoComponent} from "../update-info/update-info.component";
import {Globals} from "../../services/globals.service";
import set = Reflect.set;
import {setTime} from "ngx-bootstrap/timepicker/timepicker.utils";


@Component({
    selector: 'app-hire-service',
    templateUrl: './hire-service.component.html',
    styleUrls: ['./hire-service.component.scss']
})
export class HireServiceComponent implements OnInit {

    @Input() keyPrestador;
    infoProviderTemp: any;
    viewMessage: boolean = false;
    closeMessage: boolean = false;
    emptyFields: boolean = false;
    uid: string;
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

    constructor(private _userProviderService: userProviderService,
                private _userService: UserService,
                private _modalService: NgbModal,
                private _activeModal: NgbActiveModal) {



        this._userService.isAuthenticated().then((response: any) => {
            this.uid = response.uid;
        });

    }

    ngOnInit() {

        console.log("llave enviada desde perfil-ps: " +this.keyPrestador);

        this._userProviderService.getProviderInfoHire(this.keyPrestador).subscribe((result: any) => {
            this.infoProviderTemp = result;
        });


        this._userService.getInfoUser(this.uid).subscribe((result: any) => {

            if (result != null) {
                this.infoUser.telefono = result.telefono;
                this.infoUser.nombre = result.nombre;
                this.infoUser.domicilio.calle = result.domicilio.calle;
                this.infoUser.domicilio.colonia = result.domicilio.colonia;
                this.infoUser.domicilio.cp = result.domicilio.cp;
                this.infoUser.domicilio.numero = result.domicilio.numero;

            } else {
                this.infoUser.nombre = "";
                this.infoUser.telefono = null;
                this.infoUser.domicilio.calle = "";
                this.infoUser.domicilio.cp = null;
                this.infoUser.domicilio.colonia = "";
                this.infoUser.domicilio.numero = null;
            }

        });

        setTimeout(()=>{
            this.verifyFieldsUser(this.infoUser);
        },200)

    }



    verifyFieldsUser(field: userInfoInterface) {

        if ((field.nombre == "") || (field.telefono == null) || (field.domicilio.numero == null)
            || (field.domicilio.colonia == "") || (field.domicilio.calle == "")
        ) {
            this.emptyFields = true;
        } else {
            this.emptyFields = false;
        }
    }

    openUpdateInfo() {
        const modalUpdateInfoRef = this._modalService.open(UpdateInfoComponent, Globals.optionModalLg);
        modalUpdateInfoRef.componentInstance.uid = this.uid;
        modalUpdateInfoRef.result.then((response: any) => {
            this.infoUser = response;
            this.verifyFieldsUser(this.infoUser);
        })
    }

    sendMessageToProviderService(providerKey:string,servicio:string,userKey:string) {
        this._userService.sendNotificationUserProvider(providerKey,this.infoUser,servicio,this.uid);
        this.showMessage();
    }

    showMessage() {
        this.viewMessage = true;
        this.closeMessage = false;
        setTimeout(() => {
            this.closeMessage = true;
            setTimeout(() => {
                this.viewMessage = false;
                this._activeModal.dismiss()
            }, 1000);
        }, 2000);
    }


}
