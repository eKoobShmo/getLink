import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {FileItem} from '../models/fileItem';
import * as firebase from 'firebase';
import {MULTIMEDIA} from '../enums/enums';
import {FILE} from 'dns';

@Injectable()
export class CargaMultimediaService {

    //direccion donde se guardaran las imagenes del storage
    private CARPETA_IMAGENES: string = 'img';
    private CARPETA_REPORTES: string = 'img/reportes';
    private CARPETA_USUARIOS_PRESTADORES: string = 'img/usuariosPrestadores';
    private CARPETA_TRABAJOS: string = 'img/imagenesTrabajos';

    // private  CARPETA_IMAGENES_COMENTARIOS:string="img/comentarios";

    constructor(public af: AngularFireDatabase) {
    }

    // Lista donde se van a guardar las imagenes
    listaComentarioImagenes(): FirebaseListObservable<any[]> {
        return this.af.list(`/${this.CARPETA_IMAGENES}`)
    }


    // cargar imagenes a firebase
    cargarImagenesFirebase(archivos: FileItem[], key: string) {
        // haciendo referencia al storage de firebase

        let storageRef = firebase.storage().ref('fotos/');
        for (let item of archivos) {
            //code
            item.estaSubiendo = true;

            // referencia a una tarea de carga de firebase
            let uploadTask: firebase.storage.UploadTask =
                storageRef.child(`${this.CARPETA_IMAGENES}/${ item.nombreArchivo }`).put(item.archivo);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot: any) => item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                (error) => console.error('Error al subir', error),
                () => {
                    // obteniendo la url de la imagen ya que se subio
                    item.url = uploadTask.snapshot.downloadURL;
                    item.tamañoArchivo = uploadTask.snapshot.totalBytes;
                    item.estaSubiendo = false;
                    this.guardarImagen({nombre: item.nombreArchivo, adjuntoUrl: item.url, tipo: MULTIMEDIA.IMAGE}, key);
                }
            )

        }

    }

    cargarImagenesReportesFirebase(archivos: FileItem[], key: string) {
        // haciendo referencia al storage de firebase

        let storageRef = firebase.storage().ref('fotos/');
        for (let item of archivos) {
            //code
            item.estaSubiendo = true;

            // referencia a una tarea de carga de firebase
            let uploadTask: firebase.storage.UploadTask =
                storageRef.child(`${this.CARPETA_REPORTES}/${ item.nombreArchivo }`).put(item.archivo);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot: any) => item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                (error) => console.error('Error al subir', error),
                () => {
                    // obteniendo la url de la imagen ya que se subio
                    item.url = uploadTask.snapshot.downloadURL;
                    item.tamañoArchivo = uploadTask.snapshot.totalBytes;
                    item.estaSubiendo = false;
                    this.guardarImagenReporte({nombre: item.nombreArchivo, adjuntoUrl: item.url, tipo: MULTIMEDIA.IMAGE}, key);
                }
            )

        }

    }

    cargarImagenesTrabajosFirebase(archivos: FileItem[], key: string) {
        // haciendo referencia al storage de firebase

        let storageRef = firebase.storage().ref('fotos/');
        for (let item of archivos) {
            // referencia a una tarea de carga de firebase
            let uploadTask: firebase.storage.UploadTask =
                storageRef.child(`${this.CARPETA_TRABAJOS}/${ item.nombreArchivo }`).put(item.archivo);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot: any) => item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                (error) => console.error('Error al subir', error),
                () => {
                    // obteniendo la url de la imagen ya que se subio
                    item.url = uploadTask.snapshot.downloadURL;
                    item.tamañoArchivo = uploadTask.snapshot.totalBytes;
                    item.estaSubiendo = false;
                    this.guardarImagenesTrabajos({nombre: item.nombreArchivo, adjuntoUrl: item.url, tipo: MULTIMEDIA.IMAGE}, key);
                }
            )

        }
    }

    actualizarImagenPerfil(archivo: FileItem, key: string) {

        debugger;
        let storageRef = firebase.storage().ref('fotos/');
        let uploadTask: firebase.storage.UploadTask =
            storageRef.child(`${this.CARPETA_USUARIOS_PRESTADORES}/${archivo.nombreArchivo}`).put(archivo.archivo);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot: any) => console.log('se esta subiendo ...'),
            (error) => console.log('error'),
            () => {
                archivo.url = uploadTask.snapshot.downloadURL;
                this.actualizarImgPerfil(archivo.url, key);
            }
        )
    }

    private guardarImagenesTrabajos(imagen: any, uid: string) {
        this.af.list(`prestadoresServicios/${uid}/informacionBasica/${uid}/fotosTrabajos`).push(imagen);
    }

    private guardarImagenReporte(imagen: any, key: string) {
        this.af.list('admin/reports/' + key + '/imagenes/').push(imagen);
    }

    private guardarImagen(imagen: any, key: string) {
        this.af.list('prestadoresServicios/0/servicios/0/comentarios/' + key + '/adjuntos/').push(imagen);
    }

    private actualizarImgPerfil(imagen: string, uid: string) {
        debugger;
        this.af.list(`servicios/`)
            .update(
                uid,
                {
                    imagenUrl: imagen
                }
            )
    }


}
