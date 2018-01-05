//componentes
import {Component, OnInit} from '@angular/core';
import {ReportComponent} from '../../modals/report/report.component';
import {HireServiceComponent} from '../../modals/hire-service/hire-service.component';

//interfaces
import {providerInterface} from '../../interfaces/perfil_ps.interface';

// servicios
import {userProviderService} from '../../services/userProvider.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AcercaDeComponent} from './acerca-de/acerca-de.component';
import {UserService} from '../../services/user.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import {Broadcaster} from "../../../assets/js/broadcaster";

@Component({
    selector: 'app-perfil-ps',
    templateUrl: './perfil-ps.component.html',
    styleUrls: ['./perfil-ps.component.scss']
})
export class PerfilPSComponent implements OnInit {
    keyPrestador: string;
    datosPsServicio: providerInterface;
    tab: string = 'acercaDe';
    idUser: string;
    isFavorite: boolean;
    puntuacion:number;
    arrayFavorites: any[] = [];

    constructor(private psService: userProviderService,
                private modalService: NgbModal,
                private route: ActivatedRoute,
                private userService: UserService,
                private afAuth: AngularFireAuth,
                private broadcaster:Broadcaster) {


    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            ProviderInfo.serviceProviderKey = params['serviceProviderKey'];
            this.keyPrestador = ProviderInfo.serviceProviderKey;
            sessionStorage.setItem('keyPrestador',this.keyPrestador);
        });

        this.psService.myServiceInfo(this.keyPrestador).subscribe((response:any)=>{
            debugger;
            this.puntuacion = response.puntuacion;
        });

        this.psService.getProviderInfo(ProviderInfo.serviceProviderKey)
            .subscribe((result: any) => {
                this.datosPsServicio = result;
                ProviderInfo.datosPsServicio = result;
            });
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

    checkFavorite(uid: string) {
        this.psService.checkFavorites(uid, ProviderInfo.serviceProviderKey)
            .subscribe(result => {
                if (result.$value != null) {
                    this.isFavorite = result.$value;
                } else {
                    this.isFavorite = false;
                }
            })
    }

    goToComments(){
        this.tab='comentarios';

    }

    openReport() {
        //mandando un input a ReportComponent
        const modalReportRef = this.modalService.open(ReportComponent);
        modalReportRef.componentInstance.serviceProviderKey = ProviderInfo.serviceProviderKey;
    }

    openHire() {
        //mandando un input a ReportComponent
        const modalHireService = this.modalService.open(HireServiceComponent);
        modalHireService.componentInstance.keyPrestador = this.keyPrestador;
    }

}

export class ProviderInfo {
    public static serviceProviderKey: string;
    public static datosPsServicio: any;
}