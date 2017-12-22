import {Injectable} from "@angular/core";
import {providerInterface} from "../interfaces/perfil_ps.interface";
import {aboutServiceProviderInterface} from "../interfaces/acerca_de.interface";
import {photoGalleryInterface} from "../interfaces/galeria.interface";
import {AngularFireDatabase} from "angularfire2/database";
import {MULTIMEDIA} from "../enums/enums";
import {Observable} from "rxjs/Observable";
import {Globals} from "./globals.service";
import {UserService} from "./user.service";
import {setTime} from "ngx-bootstrap/timepicker/timepicker.utils";

@Injectable()
export class userProviderService {
    uid:string;

    constructor(private db: AngularFireDatabase,
                private _userService:UserService) {
        this.uid = sessionStorage.getItem('uid');
    }

    getProviderInfo(key: string) {
        let respuesta = this.db.object(`prestadoresServicios/${key}/informacionBasica/${key}`);

        return respuesta;
    }

    searchProviderServiceByTittle(tittle: string) {
        debugger
        return new Promise((resolve,reject)=>{
            let providerServicesFound: Observable<any[]>;
            this.db.list('servicios/').subscribe((result: any) => {
                if (!result) {
                    providerServicesFound = null;
                    reject()
                } else {
                    providerServicesFound = result.filter(it => it.titulo.toLowerCase().indexOf(tittle.toLowerCase()) >= 0);
                    Globals.arrayProvidersFound = providerServicesFound;
                }
            });
            resolve(Globals.arrayProvidersFound);
        })

    }

    registerProviderService(uid:string,infoService:providerInterface){
        this.db.list('prestadoresServicios/'+uid+'/informacionBasica').set(uid,infoService);
        this.db.list('servicios/').set(
            uid,
            {
                descripcion: infoService.descripcion,
                imagenUrl: infoService.fotoUrl,
                key: uid,
                nombre:infoService.nombre,
                puntuacion: infoService.puntuacion,
                titulo: infoService.titulo,
                trabajosRealizados: infoService.trabajosRealizados
            }
        )
    }

    getProviderInfoHire(key: string){
      return  this.db.object('servicios/'+key)
    }
    getServiceInfo(key: string) { 
        return this.db.object(`prestadoresServicios/${key}/trabajos`);
    }

    getGalleryPhotos() {
        let galeriaFotos: photoGalleryInterface [] = [{
            adjuntoUrl: '../../../../assets/images/trabajoAlbanileria2.JPG',
            // ../../../assets/images/trabajoAlbanileria2.JPG
            id: 'albanileria1',
            titulo: 'Casa casi terminada',
            tipo: MULTIMEDIA.IMAGE
        },
            {
                adjuntoUrl: '../../../../assets/images/trabajoAlbanileria3.JPG',
                id: 'albanileria2',
                titulo: 'Cocina terminada',
                tipo: MULTIMEDIA.IMAGE
            },
            {
                adjuntoUrl: '../../../../assets/images/trabajoCarpinteria1.jpg',
                id: 'carpinteria1',
                titulo: 'Puertas terminadas ',
                tipo: MULTIMEDIA.IMAGE
            },
            {
                adjuntoUrl: '../../../../assets/images/ciudad.png',
                id: 'costura1',
                titulo: 'Ciudad?',
                tipo: MULTIMEDIA.IMAGE
            },
            {
                adjuntoUrl: '../../../../assets/images/trabajoHerreria.jpg',
                id: 'herreria1',
                titulo: 'Cerco',
                tipo: MULTIMEDIA.IMAGE
            },
            {
                adjuntoUrl: '../../../../assets/images/trabajoHerreria2.jpg',
                id: 'herreria2',
                titulo: 'Soporte de escalera',
                tipo: MULTIMEDIA.IMAGE
            }];

        return galeriaFotos;
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

    pushComment(keyProvider:string){
        return this.db.list('prestadoresServicios/' + keyProvider + '/servicios/comentarios')
    }

    getNotifications(uid:string){

        return new Promise((resolve)=>{
            debugger;
            let ruta:string;
            let searchProvider:boolean=false;
            this._userService.getInfoUser(this.uid).subscribe((response:any)=>{

                if(response.isProvider){
                    debugger;
                    searchProvider = true;
                    resolve (this.db.list('prestadoresServicios/'+uid+'/notificaciones'));
                }else{
                    debugger;
                    resolve(this.db.list('usuarios/'+uid+'/notificaciones'));
                }
            });

        })



    }

    deleteNotification(index : number){
        debugger;
        this.db.list('prestadoresServicios/'+this.uid+'/notificaciones/'+index).remove();
    }

}