import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {userProviderService} from '../../services/userProvider.service';
import {ValidationService} from '../../services/validation.service';
import {alertService} from "../../services/alert.service";

@Component({
    selector: 'app-trabajos-realizados',
    templateUrl: './trabajos-realizados.component.html',
    styleUrls: ['./trabajos-realizados.component.scss']
})
export class TrabajosRealizadosComponent implements OnInit {
    uid: string;
    trabajo:string;
    errorField:boolean;

    constructor(public activeModal: NgbActiveModal,
                private _userProvider: userProviderService,
                private _validationService:ValidationService,
                private _alertService:alertService) {

        this.uid = sessionStorage.getItem('uid');

    }

    ngOnInit() {
    }

    closeModal() {
        this.activeModal.dismiss();
    }

    validateJob(job:string){
        if( this._validationService.errorInField(job)){
            this.errorField = true;
            this._alertService.error("Campo vacio","Llene el campo correspondiente");
        }else{
            this.goToInsertJob(job);
        }

    }

    goToInsertJob(job:string) {
        this._userProvider.insertJob(job,this.uid);
        this.trabajo = null;
    }


}
