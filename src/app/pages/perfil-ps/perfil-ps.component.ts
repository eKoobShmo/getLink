//componentes
import {Component, OnInit} from '@angular/core';

//interfaces
import {providerInterface} from '../../interfaces/perfil_ps.interface';
import {aboutServiceProviderInterface} from "../../interfaces/acerca_de.interface";

// servicios
import {userProviderService} from "../../services/userProvider.service";
import {alertService} from "../../services/alert.service";
import {photoGalleryInterface} from "../../interfaces/galeria.interface";
import {ActivatedRoute} from "@angular/router";

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
                private swal: alertService,
                private route:ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {

            PerfilPSComponent.serviceProviderKey= params['serviceProviderKey']; // (+) converts string 'id' to a number

            // In a real app: dispatch action to load the details here.
        });
        this.datosPsServicio = this.psService.getProviderInfo();

    }

}
