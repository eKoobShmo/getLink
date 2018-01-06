import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {reject} from 'q';
import {AngularFireDatabase} from 'angularfire2/database';
import {userInfoInterface} from '../interfaces/userInfo';
import {FileItem} from '../models/fileItem';
import {CargaMultimediaService} from './carga-archivos.service.';

@Injectable()
export class UserService {

    Reports = this.db.list('admin/reports');

    constructor(private af: AngularFireAuth,
                private db: AngularFireDatabase,
                private _cargaMultimediaService: CargaMultimediaService) {


    }

    isAuthenticated() {
        return new Promise(((resolve, reject) => {
            this.af.auth.onAuthStateChanged(
                response => {
                    if (response) {
                        resolve(response);
                    } else {
                        reject();
                    }
                });
        }));
    }

    updateUserInfo(uid: string, infoUser: userInfoInterface) {
        this.db.list('usuarios/').update(uid, infoUser)
    }

    updateDataUser(uid: string, infoUser: userInfoInterface) {
        this.db.list('usuarios/').update(uid, infoUser)

    }

    getUserFavorites(uid: string) {
        return this.db.list('usuarios/' + uid + '/favoritos')
    }

    getInfoUser(uid: string) {
        return this.db.object('usuarios/' + uid)
    }
    getInfoUser2(uid: string) {
        return new Promise(resolve => {
            this.db.object('usuarios/' + uid).subscribe(snapshot=>{
                resolve(snapshot)
            })
        })
    }

    // metodo para generar el reporte
    sendReport(keyProvider:string,optionInapropiate: boolean, optionBadService: boolean, optionNotDone: boolean, description?: string, images?: any) {
        return new Promise((resolve, reject) => {

            let report = {
                lenguajeInapropiate: optionInapropiate,
                badService: optionBadService,
                serviceNotDone: optionNotDone,
                descripcion: description,
                keyPrestador:keyProvider
            };
            let keyReport: string = this.Reports.push(report).key;
            this.Reports.update(keyReport, {key: keyReport});
            if(images!=null){
                this._cargaMultimediaService.cargarImagenesReportesFirebase(images, keyReport);
            }
            resolve();
        })

    }

    sendNotificationUserProvider(keyProvider: string, userInfo: userInfoInterface, servicio: string, userKey: string) {

        this.db.list('prestadoresServicios/' + keyProvider + '/notificaciones').push(
            {
                usuario: userInfo.nombre,
                servicioSolicitado: servicio,
                telefono: userInfo.telefono,
                keyUsuario: userKey,
                tipo:'contratar',
                mensaje:'Quiere contratar tu servicio contactalo al: ',
                titulo:'El usuario: '

            }
        )

    }

    sendInfoProvider(key:string,puntuacion:number,atencion:string){

        this.db.list(`prestadoresServicios/${key}/calificaciones`)
            .push(
                {
                    puntuacion:puntuacion,
                    atencion:atencion
                }
            )
    }

    deleteNotification(notificationKey:string, uidUser:string){
        debugger;
        this.getInfoUser2(uidUser).then((response:any)=>{
            if(response.isProvider){
                this.db.list(`prestadoresServicios/${uidUser}/notificaciones/${notificationKey}`).remove();
            }
        })
    }




}