//componentes
import {Component, OnInit} from '@angular/core';
import {ReportComponent} from "../../modals/report/report.component";
import {HireServiceComponent} from "../../modals/hire-service/hire-service.component";

//interfaces
import {providerInterface} from '../../interfaces/perfil_ps.interface';

// servicios
import {userProviderService} from "../../services/userProvider.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {AcercaDeComponent} from "./acerca-de/acerca-de.component";
import {UserService} from "../../services/user.service";
import {AngularFireAuth} from "angularfire2/auth";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap"

@Component({
    selector: 'app-perfil-ps',
    templateUrl: './perfil-ps.component.html',
    styleUrls: ['./perfil-ps.component.scss']
})
export class PerfilPSComponent implements OnInit {
    // serviceProviderKey: string;
    datosPsServicio: providerInterface;

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
        this.afAuth.auth.onAuthStateChanged((user) => {
            if (user) {
                this.idUser = user.uid;
                this.checkFavorite(user.uid);
            }
        });

    }

    open() {
        this.modalService.open(ReportComponent);
    }

    addOrRemoveToFavoriteUserProvider() {
        if (this.isFavorite) {
            this.psService.removeUserProviderToFavorites(this.idUser, ProviderInfo.serviceProviderKey);
        } else {
            this.psService.addUserProviderToFavorites(this.idUser, ProviderInfo.serviceProviderKey);
        }
    }

    checkFavorite(uid:string) {
        this.psService.checkFavorites(uid, ProviderInfo.serviceProviderKey)
            .subscribe(result => {
                if(result.$value != null){
                    this.isFavorite = result.$value;
                }else{
                    this.isFavorite = false;
                }
            })
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