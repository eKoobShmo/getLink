import {Injectable} from '@angular/core';
import {providerInterface} from '../interfaces/perfil_ps.interface';
import {aboutServiceProviderInterface} from '../interfaces/acerca_de.interface';
import {photoGalleryInterface} from '../interfaces/galeria.interface';
import {AngularFireDatabase} from 'angularfire2/database';
import {MULTIMEDIA} from '../enums/enums';
import {Observable} from 'rxjs/Observable';
import {Globals} from './globals.service';
import {UserService} from './user.service';
import {setTime} from 'ngx-bootstrap/timepicker/timepicker.utils';
import {ValidationService} from "./validation.service";
import {FileItem} from '../models/fileItem';
import {CargaMultimediaService} from './carga-archivos.service.';

@Injectable()
export class userProviderService {
    uid: string;

    constructor(private db: AngularFireDatabase,
                private _userService: UserService,
                private _validationService: ValidationService,
                private _cargaService: CargaMultimediaService) {
        this.uid = sessionStorage.getItem('uid');
    }

    getProviderInfo(key: string) {
        let respuesta = this.db.object(`prestadoresServicios/${key}/informacionBasica/${key}`);
        return respuesta;
    }

    registerProviderService(uid: string, infoService: providerInterface) {

        this.db.list('prestadoresServicios/' + uid + '/informacionBasica').update(uid, infoService);
        this.db.list('servicios/').update(
            uid,
            {
                descripcion: infoService.descripcion,
                imagenUrl: infoService.fotoUrl,
                key: uid,
                nombre: infoService.nombre,
                puntuacion: infoService.puntuacion,
                titulo: infoService.titulo,
                trabajosRealizados: infoService.trabajosRealizados
            }
        )
    }

    getProviderInfoHire(key: string) {
        return this.db.object('servicios/' + key)
    }

    getServices() {
        return this.db.list('servicios')
    }

    addUserProviderToFavorites(uidUser: string, providerKey: string) {
        this.db.list('usuarios/' + uidUser + '/favoritos').set(providerKey, 'true');
    }

    checkFavorites(uidUser: string, providerKey: string) {

        return this.db.object('usuarios/' + uidUser + '/favoritos/' + providerKey);
    }

    removeUserProviderToFavorites(uidUser: string, providerKey: string) {
        this.db.object('usuarios/' + uidUser + '/favoritos/' + providerKey).remove();
    }

    pushComment(keyProvider: string) {
        return this.db.list('prestadoresServicios/' + keyProvider + '/servicios/comentarios')
    }

    getNotifications(uid: string) {

        return new Promise((resolve) => {
            let searchProvider: boolean = false;
            this._userService.getInfoUser(this.uid).subscribe((response: any) => {

                if (response.isProvider) {
                    searchProvider = true;
                    resolve(this.db.list('prestadoresServicios/' + uid + '/notificaciones'));
                } else {
                    resolve(this.db.list('usuarios/' + uid + '/notificaciones'));
                }
            });

        })

    }

    sendFinishNotificationToUser(keyNotification: string, nombreProveedor: string, telProveedor: number, uid: string) {

        let uidUser: string;

        this.db.object('prestadoresServicios/' + this.uid + '/notificaciones/' + keyNotification)
            .subscribe((response: any) => {

                uidUser = response.keyUsuario;
                if (!this._validationService.errorInField(uidUser)) {
                    this._userService.getInfoUser2(uidUser).then((response: any) => {

                        if (response.isProvider) {

                            this.db.list('prestadoresServicios/' + uidUser + '/notificaciones')
                                .push(
                                    {
                                        nombreProveedor: nombreProveedor,
                                        telefonoProveedor: telProveedor,
                                        mensaje: 'Necesita que califiques su servicio',
                                        titulo: 'El prestador de servicios',
                                        tipo: 'calificar',
                                        keyPrestador: uid
                                    }
                                )
                        } else if (!response.isProvider) {
                            this.db.list('usuarios/' + uidUser + '/notificaciones')
                                .push(
                                    {
                                        nombreProveedor: nombreProveedor,
                                        telefonoProveedor: telProveedor,
                                        mensaje: 'Necesita que califiques su servicio',
                                        titulo: 'El prestador de servicios',
                                        tipo: 'calificar',
                                        keyPrestador: uid
                                    }
                                )
                        }
                        this.deleteNotification(keyNotification);

                    });
                }
            });


    }

    deleteNotification(index: string) {
        this.db.list('prestadoresServicios/' + this.uid + '/notificaciones/' + index).remove();
    }

    insertJob(trabajo: string, uid:string) {
        // this.db.list('prestadoresServicios/' + this.uid + '/informacionBasica/' + this.uid + '/trabajos').push(
        this.db.list(`prestadoresServicios/${uid}/informacionBasica/${uid}/trabajos`).push(
            {
                trabajo: trabajo
            }
        );

    }

    getJobs(key: string) {
        debugger;
        return this.db.list('prestadoresServicios/' + key + '/informacionBasica/' + key + '/trabajos');
    }

    getHorary(key: string) {
        return this.db.object('prestadoresServicios/' + key + '/informacionBasica/' + key + '/horario');
    }

    getJobPhotos(key: string) {
        return this.db.list('prestadoresServicios/' + key + '/informacionBasica/' + key + '/fotosTrabajos');
    }

    myServiceInfo(uid: string) {
        return this.db.object('servicios/' + uid);
    }

    updatePhotoProvider(uid: string, foto: FileItem) {
        debugger;
        this._cargaService.actualizarImagenPerfil(foto, this.uid);
    }

    getScoreService(key: string) {
        return this.db.list(`prestadoresServicios/${key}/calificaciones`);
    }

    getScoreService2(key: string) {
        let score:number=0;
        let auxScore:string;
        this.db.list(`prestadoresServicios/${key}/calificaciones`).subscribe((snapshot: any) => {

            for (let i=0; i<snapshot.length ; i++) {
                if(snapshot.length>0){
                    score = score + snapshot[i].puntuacion;
                }else{
                    break;
                }
            }

            if(score != 0){
                score = score / snapshot.length;
                auxScore = score.toString().substr(0,3);
                score = parseFloat(auxScore);

                this.db.list(`servicios/`)
                    .update(
                        key,
                        {
                            trabajosRealizados: snapshot.length,
                            puntuacion: score
                        }
                    )
            }

        })

    }


}