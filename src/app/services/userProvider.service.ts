import {Injectable} from "@angular/core";
import {providerInterface} from "../interfaces/perfil_ps.interface";
import {aboutServiceProviderInterface} from "../interfaces/acerca_de.interface";
import {photoGalleryInterface} from "../interfaces/galeria.interface";
import {AngularFireDatabase} from "angularfire2/database";
import {MULTIMEDIA} from "../enums/enums";
import {Observable} from "rxjs/Observable";

@Injectable()
export class userProviderService {


    constructor(private db: AngularFireDatabase) {

    }

    getProviderInfo(key: string) {
        let respuesta = this.db.object(`prestadoresServicios/${key}/informacionBasica`);

        return respuesta;
    }

    searchProviderServiceByTittle(tittle: string) {

        let providerServicesFound: any[] = [];
        this.db.list('servicios/').subscribe((result: any) => {
            if (!result) {
                providerServicesFound = []
            } else {
                providerServicesFound = result.filter(it => it.titulo.toLowerCase().indexOf(tittle.toLowerCase()) >= 0);
                console.log(providerServicesFound[0].titulo);
            }
        })
        // return providerServicesFound;
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
            }]

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

}