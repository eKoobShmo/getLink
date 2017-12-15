import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CargaComponent} from "../carga/carga.component";
import {FileItem} from "../../models/fileItem";
import {reportOptions} from "../../enums/reportOptions";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

    imageReport: FileItem[];
    optionInapropiate: boolean=false;
    optionBadService: boolean=false;
    optionServiceNotDone: boolean=false;
    description: string="";
    REPORTOPTIONS: any = reportOptions;

    constructor(public activeModal: NgbActiveModal,
                private modalCargaImagenes: NgbModal,
                private _userService:UserService) {

    }

    ngOnInit() {
        console.log(this.optionInapropiate)
    }


    generateReport(){

        if(!this.optionBadService && !this.optionServiceNotDone && !this.optionBadService && this.description==""){
            console.log("Selecciona almenos una opcion")
        }else{

        }
    }

    closeModal() {
        this.activeModal.dismiss();
    }

    abrirCargaImagenes() {

        this.modalCargaImagenes.open(CargaComponent).result
            .then((result) => {
                this.imageReport = result;
            })
    }

    borrarImagen(index: number) {
        this.imageReport.splice(index, 1);
    }


}
