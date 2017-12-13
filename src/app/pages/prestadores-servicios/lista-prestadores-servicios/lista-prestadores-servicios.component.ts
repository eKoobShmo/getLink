import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {userProviderService} from "../../../services/userProvider.service";
import {Router} from "@angular/router";
import {SearchValues} from "../../../layout/header/search/search.component";

@Component({
  selector: 'app-lista-prestadores-servicios',
  templateUrl: './lista-prestadores-servicios.component.html',
  styleUrls: ['./lista-prestadores-servicios.component.scss']
})
export class ListaPrestadoresServiciosComponent implements OnInit {

    servicesProviders:Observable<any[]>;

    constructor(private db: AngularFireDatabase,
                private _userProvider:userProviderService,
                private router:Router) {

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

}
