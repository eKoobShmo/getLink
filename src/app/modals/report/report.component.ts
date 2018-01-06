import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CargaComponent} from '../carga/carga.component';
import {FileItem} from '../../models/fileItem';
import {reportOptions} from '../../enums/reportOptions';
import {UserService} from '../../services/user.service';
import {alertService} from '../../services/alert.service';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
    @Input() serviceProviderKey;
    imageReport: FileItem[];
    optionInapropiate: boolean = false;
    optionBadService: boolean = false;
    optionServiceNotDone: boolean = false;
    description: string = '';
    keyProvider:string;
    REPORTOPTIONS: any = reportOptions;

    constructor(public activeModal: NgbActiveModal,
                private modalCargaImagenes: NgbModal,
                private _userService: UserService,
                private _alertService: alertService) {


        this.keyProvider = sessionStorage.getItem('keyPrestador');
    }

    ngOnInit() {
    }


    generateReport() {

        if (!this.optionBadService && !this.optionServiceNotDone && !this.optionBadService && this.description == '') {
            this._alertService.error('Verifique los campos', 'Seleccione almenos una opcion')
        } else {
            this._userService.sendReport(this.keyProvider,this.optionInapropiate, this.optionBadService, this.optionServiceNotDone, this.description, this.imageReport)
                .then((response) => {
                    this.optionServiceNotDone = false;
                    this.optionBadService = false;
                    this.optionInapropiate = false;
                    this.description = '';
                    this.imageReport = [];
                    this._alertService.successMessage('Gracias por enviarnos tu reporte', 'En breve le daremos seguimiento');
                    this.activeModal.dismiss();
                }, (error) => {

                })

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
