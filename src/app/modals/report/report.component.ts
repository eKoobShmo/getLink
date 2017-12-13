import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CargaComponent} from "../carga/carga.component";
import {FileItem} from "../../models/fileItem";

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
    imageReport:FileItem[];

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

    constructor(public activeModal: NgbActiveModal,
                private modalCargaImagenes: NgbModal,) {

    }

    ngOnInit() {
    }

    closeModal() {
        this.activeModal.dismiss();
    }

    abrirCargaImagenes() {

            this.modalCargaImagenes.open(CargaComponent).result
            .then((result) => {
                this.imageReport= result;
            })
    }

    borrarImagen(index: number) {
        this.imageReport.splice(index, 1);
    }


}
