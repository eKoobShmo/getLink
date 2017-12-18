import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {userProviderService} from "../../services/userProvider.service";
import {Router} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HireServiceComponent} from "../../modals/hire-service/hire-service.component";
import {Globals} from "../../services/globals.service";
import {Broadcaster} from "../../../assets/js/broadcaster";
import{UserService} from "../../services/user.service";
// import {HireServiceComponent} from "../../../modals/hire-service/hire-service.component";
// import {Globals} from "../../../services/globals.service";
// import {Broadcaster} from "../../../../assets/js/broadcaster";
// import {UserService} from "../../../services/user.service";


@Component({
    selector: 'app-favoritos',
    templateUrl: './favoritos.component.html',
    styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent implements OnInit {

    servicesProviders: any[];
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

    }


    getListOfProviders() {

        this._userProvider.getServices().subscribe(result => {
            debugger
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
                if (key ==  this.myFavorites[j].$key) {
                    if(this.myFavorites[j].$value){
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