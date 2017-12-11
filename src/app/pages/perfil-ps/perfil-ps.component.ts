//componentes

//interfaces
import {providerInterface} from '../../interfaces/perfil_ps.interface';

// servicios
import {userProviderService} from "../../services/userProvider.service";
import {ReportComponent} from "../../modals/report/report.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from "@angular/router";

import {Observable} from "rxjs/Observable";
import {AcercaDeComponent} from "./acerca-de/acerca-de.component";
import {UserService} from "../../services/user.service";
import {AngularFireAuth} from "angularfire2/auth";
import {Component, OnInit} from '@angular/core';
import {HireServiceComponent} from "../../modals/hire-service/hire-service.component";

@Component({
    selector: 'app-perfil-ps',
    templateUrl: './perfil-ps.component.html',
    styleUrls: ['./perfil-ps.component.scss']
})
export class PerfilPSComponent implements OnInit {
    // serviceProviderKey: string;
    datosPsServicio: Observable<providerInterface>;

    showHeart: boolean = false;
    showHeartFull: boolean = false;
    tab: string = 'acercaDe';
    idUser: string;
    isFavorite: boolean;
    arrayFavorites: any[] = [];

    constructor(private psService: userProviderService,
                private modalService: NgbModal,
                private route: ActivatedRoute,
                private userService: UserService,
                private afAuth: AngularFireAuth) {

        this.afAuth.auth.onAuthStateChanged((user) => {
            if (user) {
                this.idUser = user.uid;
                // this.psService.addUserProviderToFavorites(this.idUser,ProviderInfo.serviceProviderKey)
                this.checkFavorite();
            }
        });
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            ProviderInfo.serviceProviderKey = params['serviceProviderKey'];
        });
        this.psService.getProviderInfo(ProviderInfo.serviceProviderKey)
            .subscribe((result: any) => {
                this.datosPsServicio = result;
                ProviderInfo.datosPsServicio = result;
            })
    }

    open() {
        this.modalService.open(ReportComponent);
    }

    addToFavoriteUserProvider() {
        if(this.showHeartFull){
            this.psService.removeUserProviderToFavorites(this.idUser,ProviderInfo.serviceProviderKey);
            this.checkFavorite();
            this.showHeartFull= false;
        }else{
            this.psService.addUserProviderToFavorites(this.idUser,ProviderInfo.serviceProviderKey);
            this.checkFavorite();
            this.showHeartFull = true;
        }
    }

    checkFavorite() {
        this.psService.checkFavorites(this.idUser, ProviderInfo.serviceProviderKey).subscribe(result => {
            this.isFavorite = result.$value;
        });
    }

    openReport() {
        //mandando un input a ReportComponent
        this.modalService.open(ReportComponent);
    }

    openHire() {
        //mandando un input a ReportComponent
        this.modalService.open(HireServiceComponent);
    }

}

export class ProviderInfo {
    public static serviceProviderKey: string;
    public static datosPsServicio: any;
}