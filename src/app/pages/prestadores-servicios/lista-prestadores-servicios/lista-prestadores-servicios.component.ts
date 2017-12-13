import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {userProviderService} from "../../../services/userProvider.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HireServiceComponent} from "../../../modals/hire-service/hire-service.component";
import {GlobalsService} from "../../../services/globals.service";
import {Broadcaster} from "../../../../assets/js/broadcaster";

@Component({
  selector: 'app-lista-prestadores-servicios',
  templateUrl: './lista-prestadores-servicios.component.html',
  styleUrls: ['./lista-prestadores-servicios.component.scss']
})
export class ListaPrestadoresServiciosComponent implements OnInit {

    servicesProviders:any[];
    servicesProvidersTmp:any[];

    constructor(private db: AngularFireDatabase,
                private _userProvider:userProviderService,
                private router:Router,
                private modalService:NgbModal,
                private broadcaster: Broadcaster) {

    }

    ngOnInit() {
        this.getListOfProviders();

        this.broadcaster.on<string>('busqueda')
            .subscribe(message => {
                this.servicesProvidersTmp = this.servicesProviders.filter((it:any) => it.titulo.toLowerCase().indexOf(message.toLowerCase()) >= 0);
            });

    }

    getListOfProviders(){
        this._userProvider.getServices().subscribe(result=>{
            this.servicesProviders = result;
            this.servicesProvidersTmp = result;
        })
    }

    goToService(key:string){
        this.router.navigate([`/perfil-ps/${key}/acercaDe`]);
    }

    openHire(keyPrestador:string) {
        //mandando un input a ReportComponent

        const modalRef=this.modalService.open(HireServiceComponent);
        modalRef.componentInstance.keyPrestador=keyPrestador;

    }


}
