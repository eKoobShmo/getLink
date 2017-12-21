import {Component, OnInit, ElementRef, Input} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {observable} from "rxjs/symbol/observable";
import {GalleryComponent} from "../../../../modals/gallery/gallery.component";
import {ModalMultimediaService} from "../../../../services/modal-multimedia.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs/Observable";


@Component({
    selector: 'app-comentario',
    templateUrl: './comentario.component.html',
    styleUrls: ['./comentario.component.scss'],
    inputs: ['photo', 'userName', 'comment', 'date']
})
export class ComentarioComponent implements OnInit {
    @Input() key;
    existPhoto:boolean;
    response: FirebaseListObservable<any[]>;
    adjuntos:any[] = [];
    favorite:boolean=false;

    constructor(private af: AngularFireDatabase,
                private multimediaService:ModalMultimediaService,
                private modalService:NgbModal,
                private afAuth:AngularFireAuth) {
    }

    ngOnInit() {
        this.getAttached()
            .subscribe(snapshots => {
                snapshots.forEach(snapshot => {
                    this.adjuntos.push(snapshot.val());
                })
            })
    }



    getAttached(): Observable<any>{
        return this.af.list('prestadoresServicios/0/servicios/0/comentarios/' + this.key + '/adjuntos/', {preserveSnapshot: true})
    }
    openImageModal(index:number){
        // let arrayImages
        let arrayImages = this.multimediaService.getMultimediaFromArray(this.adjuntos);
        //mandando un input a GalleryComponent
        const modalRef = this.modalService.open(GalleryComponent);
        modalRef.componentInstance.index = index;
        modalRef.componentInstance.arrayImages = arrayImages;
    }


}
