import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class Globals {


    constructor(public _activeModal: NgbActiveModal) {
    }

    static arrayProvidersFound: Observable<any[]>;

    static optionModalSm: object = {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
    };

    static optionModalLg: object = {
        backdrop: 'static',
        keyboard: false,
        size: 'lg'
    };


    // closeModal(activeModal: any) {
    //     activeModal.dismiss();
    // }

}
