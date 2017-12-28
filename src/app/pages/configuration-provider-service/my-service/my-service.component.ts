import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TrabajosRealizadosComponent} from '../../../modals/trabajos-realizados/trabajos-realizados.component';
import {ValidationService} from '../../../services/validation.service';
import {userProviderService} from '../../../services/userProvider.service';
import {providerInterface} from '../../../interfaces/perfil_ps.interface';
import {UserService} from '../../../services/user.service';
import {Globals} from '../../../services/globals.service';
import {Router} from "@angular/router";

@Component({
    selector: 'app-my-service',
    templateUrl: './my-service.component.html',
    styleUrls: ['./my-service.component.scss']
})
export class MyServiceComponent implements OnInit {
    uid: string;
    isEdit: boolean = false;
    isUpdating: boolean = false;
    fieldPuntuacion:number;

    fieldTitulo: string;
    fieldDescripcion: string;
    fieldTrabajosRealizados:number;
    radiobtnLunes: boolean = false;
    radiobtnMartes: boolean = false;
    radiobtnMiercoles: boolean = false;
    radiobtnJueves: boolean = false;
    radiobtnViernes: boolean = false;
    radiobtnSabado: boolean = false;
    radiobtnDomingo: boolean = false;
    myServiceInfo: providerInterface = {
        nombre: '',
        titulo: '',
        puntuacion: 0,
        telefono: null,
        horario: {
            Lunes: false,
            Martes: false,
            Miercoles: false,
            Jueves: false,
            Viernes: false,
            Sabado: false,
            Domingo: false,
        },
        direccion: {
            cp: null,
            calle: '',
            colonia: '',
            numero: null
        },
        descripcion: '',
        email: '',
        fotoUrl: '',
        trabajosRealizados: 0
    };

    errorTitulo: boolean = false;
    errorDescripcion: boolean = false;


    constructor(private _modalService: NgbModal,
                private _validationService: ValidationService,
                private _userProviderService: userProviderService,
                private _userService: UserService,
                private router: Router,) {

        this.uid=sessionStorage.getItem('uid');

        this._userService.isAuthenticated().then((response: any) => {
            // this.uid = response.uid;
            if (!this._validationService.errorInField(response.displayName)) {
                this.myServiceInfo.nombre = response.displayName;
            }
            if (!this._validationService.errorInField(response.email)) {
                this.myServiceInfo.email = response.email;
            }
            if (!this._validationService.errorInField(response.photoURL)) {
                this.myServiceInfo.fotoUrl = response.photoURL;
            }
        })

    }

    ngOnInit() {

        this._userProviderService.myServiceInfo(this.uid).subscribe((response:any)=>{
            this.fieldTitulo = response.titulo;
            this.fieldDescripcion = response.descripcion;
            this.fieldTrabajosRealizados = response.trabajosRealizados;
            this.fieldPuntuacion = response.puntuacion;

        });

        this._userProviderService.getHorary(this.uid).subscribe((horario:any)=>{

            if(horario.Lunes){
                this.radiobtnLunes = true;
            }
            if(horario.Martes){
                this.radiobtnMartes = true;
            }
            if(horario.Miercoles){
                this.radiobtnMiercoles = true;
            }
            if(horario.Jueves){
                this.radiobtnJueves = true;
            }
            if(horario.Viernes){
                this.radiobtnViernes = true;
            }
            if(horario.Sabado){
                this.radiobtnSabado = true;
            }
            if(horario.Domingo){
                this.radiobtnDomingo = true;
            }

        });


        this._userService.getInfoUser(this.uid).subscribe((response: any) => {

            if (this._validationService.errorInField(this.myServiceInfo.nombre)) {
                this.myServiceInfo.nombre = response.nombre;
            }
            this.myServiceInfo.telefono = response.telefono;
            this.myServiceInfo.direccion.calle = response.domicilio.calle;
            this.myServiceInfo.direccion.colonia = response.domicilio.colonia;
            this.myServiceInfo.direccion.numero = response.domicilio.numero;
            this.myServiceInfo.direccion.cp = response.domicilio.cp;

        });

    }


    verifyFields(titulo: string, descripcion: string) {
        debugger;
        if (this._validationService.errorInField(titulo)) {
            this.errorTitulo = true;
        } else {
            this.myServiceInfo.titulo = this.fieldTitulo;
            if (this._validationService.errorInField(descripcion)) {
                this.errorDescripcion = true;
            } else {
                this.myServiceInfo.descripcion = this.fieldDescripcion;
                this.myServiceInfo.horario.Lunes = this.radiobtnLunes;
                this.myServiceInfo.horario.Martes = this.radiobtnMartes;
                this.myServiceInfo.horario.Miercoles = this.radiobtnMiercoles;
                this.myServiceInfo.horario.Jueves = this.radiobtnJueves;
                this.myServiceInfo.horario.Viernes = this.radiobtnViernes;
                this.myServiceInfo.horario.Sabado = this.radiobtnSabado;
                this.myServiceInfo.horario.Domingo = this.radiobtnDomingo;
                if(this.fieldPuntuacion!=0){
                    this.myServiceInfo.puntuacion = this.fieldPuntuacion;
                }
                if(this.fieldTrabajosRealizados != 0){
                    this.myServiceInfo.trabajosRealizados = this.fieldTrabajosRealizados;
                }



                this.goToRegisterProviderService(this.myServiceInfo);
            }
        }
    }

    goToRegisterProviderService(infoService: providerInterface) {
        this._userProviderService.registerProviderService(this.uid,infoService);
        this.isEdit = false;
        this.isUpdating = false;
    }

    updateUser() {
        this.isEdit = true;
        this.isUpdating = true;
    }

    cancelEdit() {
        this.isEdit = false;
        this.isUpdating = false;
    }

    goToService() {
        this.router.navigate([`/perfil-ps/${this.uid}/acercaDe`]);
    }

    openModalTrabajosR() {
        this._modalService.open(TrabajosRealizadosComponent, Globals.optionModalLg);

    }

}
