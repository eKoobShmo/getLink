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
                private _cargaMultimediaService:CargaMultimediaService) {


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

    getUserFavorites(uid: string) {
        return this.db.list('usuarios/' + uid + '/favoritos')
    }

    getInfoUser(uid: string) {
        return this.db.object('usuarios/' + uid)
    }


    // metodo para generar el reporte
    sendReport(optionInapropiate: boolean, optionBadService: boolean, optionNotDone: boolean, description?: string, images?:any) {
        return new Promise((resolve,reject) => {
            // this.db.list('admin/reports').push(
            //     {
            //         lenguajeInapropiate: optionInapropiate,
            //         badService: optionBadService,
            //         serviceNotDone: optionNotDone,
            //         descripcion: description
            //
            //     }
            // );
            let report = {
                lenguajeInapropiate: optionInapropiate,
                badService: optionBadService,
                serviceNotDone: optionNotDone,
                descripcion: description
            };
            let keyReport: string = this.Reports.push(report).key;
            this.Reports.update(keyReport, {key: keyReport});
            this._cargaMultimediaService.cargarImagenesReportesFirebase(images,keyReport);

            resolve();
        })

    }

    sendNotificationUserProvider(keyProvider: string, userInfo: userInfoInterface, servicio: string, userKey: string) {

        this.db.list('prestadoresServicios/' + keyProvider + '/notificaciones').push(
            {
                usuario: userInfo.nombre,
                servicioSolicitado: servicio,
                telefono: userInfo.telefono,
                keyUsuario: userKey

            }
        )

    }


}