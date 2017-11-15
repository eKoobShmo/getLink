import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-lista-prestadores-servicios',
  templateUrl: './lista-prestadores-servicios.component.html',
  styleUrls: ['./lista-prestadores-servicios.component.scss']
})
export class ListaPrestadoresServiciosComponent implements OnInit {

    servicesProviders:Observable<any[]>;

    constructor(private db: AngularFireDatabase) {
        this.servicesProviders = db.list('prestadoresServicios', ref => ref.orderByChild().equalTo({key: 'informacionBasica'}));
        // this.servicesProviders = db.list('prestadoresServicios');

        console.log(this.servicesProviders);
    }

    ngOnInit() {
    }


}
