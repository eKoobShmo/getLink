import {Component, OnInit} from '@angular/core';
import {commentInterface} from "../../../interfaces/comentario.interface";
import{AngularFireDatabase,FirebaseListObservable} from "angularfire2/database";
import{ActivatedRoute} from "@angular/router";
import {PerfilPSComponent} from "../perfil-ps.component";

@Component({
    selector: 'app-tab-comentario',
    templateUrl: './tab-comentario.component.html',
    styleUrls: ['./tab-comentario.component.scss']
})
export class TabComentarioComponent implements OnInit {

    comments:FirebaseListObservable<any[]>;
    comments2:string[]=['hola'];
    id:string;
    constructor(private af:AngularFireDatabase,
                private route:ActivatedRoute) {

    }

    ngOnInit() {

           this.comments=this.af.list('prestadoresServicios/'+ PerfilPSComponent.serviceProviderKey +'/servicios/0/comentarios');

    }

}
