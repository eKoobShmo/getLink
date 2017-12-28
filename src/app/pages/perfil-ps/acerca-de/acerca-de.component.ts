import { Component, OnInit,Input } from '@angular/core';
import {aboutServiceProviderInterface} from "../../../interfaces/acerca_de.interface";
import{userProviderService} from "../../../services/userProvider.service";
import {Observable} from "rxjs/Observable";
import {PerfilPSComponent} from "../perfil-ps.component";
import {ProviderInfo} from "../perfil-ps.component";
import {providerInterface} from "../../../interfaces/perfil_ps.interface";

@Component({
    selector: 'app-acerca-de',
    templateUrl: './acerca-de.component.html',
    styleUrls: ['./acerca-de.component.scss']
})
export class AcercaDeComponent implements OnInit {
    arrayTrabajosRealzados:any[];
    lengthItems:number;
    serviceProviderInfo:Observable<providerInterface>;
    info:any;
    constructor(private infoProvider:ProviderInfo,
                private psService:userProviderService) {
    }

    ngOnInit() {
        this.psService.getProviderInfo(ProviderInfo.serviceProviderKey)
            .subscribe((result: any) => {
               this.serviceProviderInfo=result;
            });

        this.psService.getJobs(ProviderInfo.serviceProviderKey).subscribe((result:any)=>{
            debugger;
            this.lengthItems = result.length;
            this.arrayTrabajosRealzados = result;
        })

    }

}


