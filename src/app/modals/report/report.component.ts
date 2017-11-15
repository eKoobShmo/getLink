import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
    listImage: any[] = [
        {
            image: "../../../assets/images/plomero2.PNG"
        },
        {
            image: "../../../assets/images/plomero2.PNG"
        },
        {
            image: "../../../assets/images/plomero2.PNG"
        },
        {
            image: "../../../assets/images/plomero2.PNG"
        },
        {
            image: "../../../assets/images/plomero2.PNG"
        },
        {
            image: "../../../assets/images/plomero2.PNG"
        },
        {
            image: "../../../assets/images/plomero2.PNG"
        },
        {
            image: "../../../assets/images/plomero2.PNG"
        }
    ];

    constructor(public activeModal: NgbActiveModal) {

    }

    ngOnInit() {
    }

    closeModal() {
        this.activeModal.dismiss();
    }


}
