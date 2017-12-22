import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-calificar-servicio',
    templateUrl: './calificar-servicio.component.html',
    styleUrls: ['./calificar-servicio.component.scss']
})
export class CalificarServicioComponent implements OnInit {
    regular: boolean = false;
    bueno: boolean = false;
    malo: boolean=false;
    howWasService:boolean=false;

    constructor(private activeModal: NgbActiveModal) {
    }

    ngOnInit() {
    }

    closeModal() {
        this.activeModal.dismiss();
    }

    moodSelectRegular() {
        this.regular = true;
        this.malo=false;
        this.bueno=false;
    }

    moodSelectHappy() {
        this.regular = false;
        this.malo=false;
        this.bueno=true;
    }

    moodSelectAngry() {
        this.regular = false;
        this.malo=true;
        this.bueno=false;
    }

    arrowNext(){
        this.howWasService=true;
    }
}
