import {Component, OnInit, ElementRef, Input} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {observable} from "rxjs/symbol/observable";


@Component({
    selector: 'app-comentario',
    templateUrl: './comentario.component.html',
    styleUrls: ['./comentario.component.scss'],
    inputs: ['photo', 'userName', 'comment', 'date']
})
export class ComentarioComponent implements OnInit {
    @Input() key;
    response: FirebaseListObservable<any[]>;
    adjuntos:any[] = [];

    constructor(private af: AngularFireDatabase) {
    }

    ngOnInit() {
        this.response = this.af.list('prestadoresServicios/0/servicios/0/comentarios/' + this.key + '/adjuntos/', {preserveSnapshot: true})
            .subscribe(snapshots => {
                // console.log("snapshots "+snapshots.values())
                snapshots.forEach(snapshot => {
                    this.adjuntos.push(snapshot.val());
                })
            })
    }
}
