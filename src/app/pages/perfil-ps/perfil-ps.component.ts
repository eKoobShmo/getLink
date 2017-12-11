//componentes

//interfaces
import {providerInterface} from '../../interfaces/perfil_ps.interface';

// servicios
import {userProviderService} from "../../services/userProvider.service";
import {ReportComponent} from "../../modals/report/report.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from "@angular/router";
import {Component, OnInit} from '@angular/core';
import {HireServiceComponent} from "../../modals/hire-service/hire-service.component";


@Component({
    selector: 'app-perfil-ps',
    templateUrl: './perfil-ps.component.html',
    styleUrls: ['./perfil-ps.component.scss']
})
export class PerfilPSComponent implements OnInit {


    datosPsServicio: providerInterface;

    showHeart:boolean=false;
    showHeartFull:boolean = true;
    // showHeart:boolean=true;

    static serviceProviderKey:string;
    tab: string = 'acercaDe';

    constructor(private psService: userProviderService,
                private modalService: NgbModal,
                private route:ActivatedRoute){

    }


    ngOnInit() {
        this.route.params.subscribe(params => {

            PerfilPSComponent.serviceProviderKey= params['serviceProviderKey']; // (+) converts string 'id' to a number

            // In a real app: dispatch action to load the details here.
        });
        this.datosPsServicio = this.psService.getProviderInfo();

    }

    openReport() {
        //mandando un input a ReportComponent
        this.modalService.open(ReportComponent);
    }
    openHire() {
        //mandando un input a ReportComponent
        this.modalService.open(HireServiceComponent);
    }

}
