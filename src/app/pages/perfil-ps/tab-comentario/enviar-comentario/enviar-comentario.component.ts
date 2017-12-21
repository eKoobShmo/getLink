import {Component, OnInit, ElementRef} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {commentInterface} from "../../../../interfaces/comentario.interface";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CargaMultimediaService} from '../../../../services/carga-archivos.service.';
import {DatePipe} from "@angular/common";
import {CargaComponent} from "../../../../modals/carga/carga.component";
import {FileItem} from "../../../../models/fileItem";
import {UserService} from '../../../../services/user.service';
import {ValidationService} from '../../../../services/validation.service';

@Component({
    selector: 'app-enviar-comentario',
    templateUrl: './enviar-comentario.component.html',
    styleUrls: ['./enviar-comentario.component.scss']
})
export class EnviarComentarioComponent implements OnInit {

    uid:string;
    userEmail: string;
    username: string;
    userPhoto: string;
    existPhoto:boolean;
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
                private _cargaMultimediaService: CargaMultimediaService,
                private _userService:UserService,
                private _validationService:ValidationService) {
        this.getUserData();

        setTimeout(()=>{
            this._userService.getInfoUser(this.uid).subscribe((response:any)=>{
                if(this._validationService.errorInField(response.nombre)){
                    this.username = "Usuario";
                }else{
                    this.username = response.nombre;
                }
            })
        },500);

        this.comments = db.list('prestadoresServicios/0/servicios/0/comentarios')
    }

    ngOnInit() {

    }


    getUserData() {
        this.afAuth.auth.onAuthStateChanged((user) => {
            debugger;
            this.uid=user.uid;
            this.userEmail = user.email;
            if(user.displayName!=null){
                this.username = user.displayName;
            }

            if(user.photoURL!=null){
                this.userPhoto = user.photoURL;
                this.existPhoto=true;
            }else{
                this.userPhoto = '../../../../assets/images/user.png';
                this.existPhoto=false;
            }
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
            },error =>{
                console.log("se devolvio en promesa: " , this.imagenesComentarios)
            })

    }

    borrarImagen(index: number) {
        this.imagenesComentarios.splice(index, 1);
    }

}
