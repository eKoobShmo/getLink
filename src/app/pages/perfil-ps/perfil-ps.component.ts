//componentes
import {Component, OnInit} from '@angular/core';

//interfaces
import {providerInterface} from '../../interfaces/perfil_ps.interface';

// servicios
import {userProviderService} from "../../services/userProvider.service";
import {ReportComponent} from "../../modals/report/report.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-perfil-ps',
    templateUrl: './perfil-ps.component.html',
    styleUrls: ['./perfil-ps.component.scss']
})
export class PerfilPSComponent implements OnInit {

    //variable para mandar a llamar el servicio tipo []
    datosPsServicio: providerInterface;

    showHeart:boolean=false;
    showHeartFull:boolean = true;
    // showHeart:boolean=true;


    tab: string = 'acercaDe';

    constructor(private psService: userProviderService,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        this.datosPsServicio = this.psService.getProviderInfo();

    }

    open() {
        //mandando un input a ReportComponent
        const modalRef = this.modalService.open(ReportComponent);


    }

}
