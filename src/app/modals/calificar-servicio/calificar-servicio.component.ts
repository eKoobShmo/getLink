import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../services/user.service';
import {ESTRELLAS} from '../../enums/estrellas';
import {alertService} from '../../services/alert.service';

@Component({
    selector: 'app-calificar-servicio',
    templateUrl: './calificar-servicio.component.html',
    styleUrls: ['./calificar-servicio.component.scss']
})
export class CalificarServicioComponent implements OnInit {
    @Input() key;
    @Input() notificationKey;
    regular: boolean = false;
    bueno: boolean = false;
    malo: boolean = false;
    howWasService: boolean = false;
    keyPrestador: string;
    ESTRELLAS: any = ESTRELLAS;
    atencion: string;
    uid:string;

    constructor(private activeModal: NgbActiveModal,
                private _userService: UserService,
                private _alertService:alertService) {
            this.uid= sessionStorage.getItem('uid');
    }

    ngOnInit() {

    }

    closeModal() {
        this.activeModal.dismiss();
    }

    moodSelectRegular() {
        this.regular = true;
        this.malo = false;
        this.bueno = false;
        this.howWasService = true;
    }

    moodSelectHappy() {
        this.regular = false;
        this.malo = false;
        this.bueno = true;
        this.howWasService = true;
    }

    moodSelectAngry() {
        this.regular = false;
        this.malo = true;
        this.bueno = false;
        this.howWasService = true;
    }




    goToSendInfoToProvider(numEstrellas:number) {

        switch (numEstrellas) {
            case ESTRELLAS.UNA:
                this.atencion = this.checkAtention();
                this._userService.sendInfoProvider(this.key,1,this.atencion);
                this._alertService.successMessage("Gracias por mandarnos tu opinión","");
                break;
            case ESTRELLAS.DOS:
                this.atencion = this.checkAtention();
                this._userService.sendInfoProvider(this.key,2,this.atencion);
                this._alertService.successMessage("Gracias por mandarnos tu opinión","");
                break;
            case ESTRELLAS.TRES:
                this.atencion = this.checkAtention();
                this._userService.sendInfoProvider(this.key,3,this.atencion);
                this._alertService.successMessage("Gracias por mandarnos tu opinión","");
                break;
            case ESTRELLAS.CUATRO:
                this.atencion = this.checkAtention();
                this._userService.sendInfoProvider(this.key,4,this.atencion);
                this._alertService.successMessage("Gracias por mandarnos tu opinión","");
                break;
            case ESTRELLAS.CINCO:
                this.atencion = this.checkAtention();
                this._userService.sendInfoProvider(this.key,5,this.atencion);
                this._alertService.successMessage("Gracias por mandarnos tu opinión","");
                break;

        }
        this._userService.deleteNotification(this.notificationKey,this.uid);
        this.activeModal.dismiss();
    }

    checkAtention() {

        if (this.bueno) {
            return 'buena';
        } else {
            if (this.regular) {
                return 'regular';
            } else if (this.malo) {
                return 'mala';
            }
        }
    }
}
