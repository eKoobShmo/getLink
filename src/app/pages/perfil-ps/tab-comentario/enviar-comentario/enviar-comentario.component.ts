import {Component, OnInit, ElementRef} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {commentInterface} from "../../../../interfaces/comentario.interface";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CargaMultimediaService} from '../../../../services/carga-archivos.service.';
import {DatePipe} from "@angular/common";
import {CargaComponent} from "../../../../modals/carga/carga.component";
import {FileItem} from "../../../../models/fileItem";

@Component({
    selector: 'app-enviar-comentario',
    templateUrl: './enviar-comentario.component.html',
    styleUrls: ['./enviar-comentario.component.scss']
})
export class EnviarComentarioComponent implements OnInit {

    userEmail: string;
    username: string;
    userPhoto: string;
    urlImageComment: string;
    comments: FirebaseListObservable<any>;
    currentDate = new Date();
    imagenesComentarios: FileItem[] = [];
    private firebaseApp: any;

    constructor(db: AngularFireDatabase,
                private  afAuth: AngularFireAuth,
                private elementRef: ElementRef,
                private modalCargaImagenes: NgbModal,
                private _componentCarga: CargaComponent,
                private _cargaMultimediaService: CargaMultimediaService) {
        this.getUserData();
        this.comments = db.list('prestadoresServicios/0/servicios/0/comentarios')
    }

    ngOnInit() {
    }


    getUserData() {
        this.afAuth.auth.onAuthStateChanged((user) => {
            this.userEmail = user.email;
            this.username = user.displayName;
            this.userPhoto = user.photoURL;
            console.log(this.userPhoto)
        })
    }


    sendComment(txtcomment: string) {

        let comment: commentInterface =
            {
                nombreUsuario: this.username,
                foto: this.userPhoto,
                comentario: txtcomment,
                poderComentar: false,
                fecha: this.currentDate.toString()
            };
        let keyComment: string = this.comments.push(comment).key;
        this.comments.update(keyComment, {key: keyComment});
        this._cargaMultimediaService.cargarImagenesFirebase(this.imagenesComentarios, keyComment);
        this.imagenesComentarios = [];

    }
    abrirCargaImagenes() {
        const modalCargaRef = this.modalCargaImagenes.open(CargaComponent)
            .result.then((result) => {
                this.imagenesComentarios = result;
                // console.log("imagenes comentarios = ", this.imagenesComentarios)
            },error =>{
                console.log("se devolvio en promesa: " , this.imagenesComentarios)
                // console.log("no devolvio nada")
            })

    }

    borrarImagen(index: number) {
        this.imagenesComentarios.splice(index, 1);
    }

}
