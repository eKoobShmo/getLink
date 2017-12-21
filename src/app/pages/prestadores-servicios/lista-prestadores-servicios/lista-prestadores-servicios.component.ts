import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {userProviderService} from '../../../services/userProvider.service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HireServiceComponent} from '../../../modals/hire-service/hire-service.component';
import {Globals} from '../../../services/globals.service';
import {Broadcaster} from '../../../../assets/js/broadcaster';
import {AngularFireAuth} from 'angularfire2/auth';
import {UserService} from '../../../services/user.service';
import {providerInterface} from "../../../interfaces/perfil_ps.interface";
import {PerfilPSComponent} from "../../perfil-ps/perfil-ps.component";

@Component({
    selector: 'app-lista-prestadores-servicios',
    templateUrl: './lista-prestadores-servicios.component.html',
    styleUrls: ['./lista-prestadores-servicios.component.scss']
})
export class ListaPrestadoresServiciosComponent implements OnInit {
    arrProviders: any[] = [];
    servicesProviders: any[];
    // servicesProvidersTmp: providerInterface[];
    servicesProvidersTmp: any[];
    isFavorite: boolean;
    keyProviderTemp: string;
    keyFavoriteTemp: string;
    uid: string;
    myFavorites: any[];

    constructor(private db: AngularFireDatabase,
                private _userProvider: userProviderService,
                private router: Router,
                private modalService: NgbModal,
                private broadcaster: Broadcaster,
                private afAuth: AngularFireAuth,
                private _usrService: UserService) {

    }

    ngOnInit() {
        this.getListOfProviders();

        this.broadcaster.on<string>('busqueda')
            .subscribe(message => {
                this.servicesProvidersTmp = this.servicesProviders.filter((it: any) => it.titulo.toLowerCase().indexOf(message.toLowerCase()) >= 0);
            });


        // filtro de trabajos Realizados con radiobuttons
        this.broadcaster.on<string>('filtroTrabajosRealizados')
            .subscribe(message => {

                function comparar(a, b) {
                    return b.trabajosRealizados - a.trabajosRealizados;
                }

                this.servicesProvidersTmp = this.servicesProvidersTmp.sort(comparar);

            });

        // filtro de trabajos Realizados con radiobuttons
        this.broadcaster.on<string>('filterByScore')
            .subscribe(message => {

                function comparar(a, b) {
                    return b.puntuacion - a.puntuacion;
                }

                this.servicesProvidersTmp = this.servicesProvidersTmp.sort(comparar);

            });
    }


    getListOfProviders() {

        this._userProvider.getServices().subscribe((result: any) => {
            this.servicesProviders = result;
            this.servicesProvidersTmp = result;

            this.afAuth.auth.onAuthStateChanged((user) => {
                if (user) {
                    this.uid = user.uid;
                    this.getFavorites(user.uid);
                }
            });
        });
    }

    getFavorites(uid: string) {
        this._usrService.getUserFavorites(uid).subscribe((result: any) => {
            this.myFavorites = result;
        })
    }

    checkFavorite(key: string): boolean {
        // hacer un for para obtener la key de cada prestador y compararla con las keys
        // de los favoritos del usuario

        let favorite: boolean = false;
        if (this.myFavorites != null) {
            for (let j = 0; j < this.myFavorites.length; j++) {
                if (key == this.myFavorites[j].$key) {
                    if (this.myFavorites[j].$value) {
                        favorite = true;
                        break;
                    }
                }
            }
        }
        return favorite;
    }

    goToService(key: string) {
        this.router.navigate([`/perfil-ps/${key}/acercaDe`]);

    }

    openHire(keyPrestador: string) {
        //mandando un input a ReportComponent
        const modalRef = this.modalService.open(HireServiceComponent);
        modalRef.componentInstance.keyPrestador = keyPrestador;

    }


}
