import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {userProviderService} from "../../../services/userProvider.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HireServiceComponent} from "../../../modals/hire-service/hire-service.component";

@Component({
  selector: 'app-lista-prestadores-servicios',
  templateUrl: './lista-prestadores-servicios.component.html',
  styleUrls: ['./lista-prestadores-servicios.component.scss']
})
export class ListaPrestadoresServiciosComponent implements OnInit {

    servicesProviders:Observable<any[]>;

    constructor(private db: AngularFireDatabase,
                private _userProvider:userProviderService,
                private router:Router,
                private modalService:NgbModal) {

    }

    ngOnInit() {
        this.servicesProviders=this._userProvider.getServices();
    }

    goToService(key:string){
        this.router.navigate([`/perfil-ps/${key}/acercaDe`]);
    }

    searchServiceProviders(textoAbuscar:string){
        this._userProvider.searchProviderServiceByTittle(textoAbuscar);
    }


    open() {
        this.modalService.open(HireServiceComponent);
    }

}
