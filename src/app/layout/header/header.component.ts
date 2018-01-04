import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../shared/services/shared.service";
import {AngularFireAuth} from 'angularfire2/auth';
import{Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {userProviderService} from "../../services/userProvider.service";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalificarServicioComponent} from '../../modals/calificar-servicio/calificar-servicio.component';
import {Globals} from '../../services/globals.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [
        './header.component.scss'
    ]
})
export class HeaderComponent implements OnInit {
    uid:string;
    numberNotifications:number;
    maThemeModel: string = 'green';
    showMenu: boolean = false;
    userEmail: string;
    userName: string;
    userPhoto: string;
    userLogged: boolean;
    userNotifications:any[];

    constructor(private sharedService: SharedService,
                private afAuth: AngularFireAuth,
                private _userService: UserService,
                private _providerService: userProviderService,
                private router:Router,
                private _modalService:NgbModal
    ) {
        this.showHeader();
        this.uid = sessionStorage.getItem('uid');

    }

    ngOnInit() {

        // si no le pongo este time out no agarra las notificaciones al inicio de sesion
        setTimeout(()=>{
            this._providerService.getNotifications(this.uid).then((response:any)=>{
                response.subscribe((result:any)=>{
                    this.numberNotifications = result.length;
                    this.userNotifications = result;
                })
            })
        },300)
    }

    setTheme() {
        this.sharedService.setTheme(this.maThemeModel)
    }


    userSignOut() {
        this.afAuth.auth.signOut();
        this.router.navigate(['/login']);
    }

    goToCategories(){
        this.router.navigate(['/categorias'])
    }

    goToHire(){
        this.router.navigate(['/prestadores-servicios']);
        this.showMenu=false;
    }

    goToFavorites(){
        this.router.navigate(['/favoritos']);
        this.showMenu=false;
    }

    goToMyProfile(){
        // window.location.href='#/configuracionPrestador';
        this.router.navigate(['/configuracionPrestador/miPerfil']);
        this.showMenu=false;
    }

    showHeader() {
        this._userService.isAuthenticated()
            .then((response:any) => {
                sessionStorage.setItem('uid',response.uid);
                this.userLogged = true;
                this.userEmail = response.email;
                this.userName = response.displayName;
                if(response.photoURL!=null){
                    this.userPhoto = response.photoURL;
                }else{
                    this.userPhoto==null;
                }

            })
            .catch(error => {
                this.userLogged = false;

            })

    }


    goToLogin(){
        this.router.navigate(['/login']);
    }

    goToFinishNotification(index:string){
        let telefono:number;
        let nombreProveedor:string;
        this._userService.getInfoUser(this.uid).subscribe((response:any)=>{

            nombreProveedor = response.nombre;
            telefono = response.telefono;
            this._providerService.sendFinishNotificationToUser(index ,nombreProveedor,telefono,this.uid);

        });

        // setTimeout(()=>{
        //     this._providerService.deleteNotification(index);
        // },500)


    }

    goToRateProvider(key:string,notificationKey:string){
        this.router.navigate([`/perfil-ps/${key}/acercaDe`]);
        const calificarServiceRef = this._modalService.open(CalificarServicioComponent , Globals.optionModalLg);
        calificarServiceRef.componentInstance.key = key;
        calificarServiceRef.componentInstance.notificationKey = notificationKey;

    }

}
