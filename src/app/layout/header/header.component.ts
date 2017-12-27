import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../shared/services/shared.service";
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import{Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {window} from "rxjs/operator/window";
import {userProviderService} from "../../services/userProvider.service";
import {unescapeIdentifier} from "@angular/compiler";
import {notificationInterface} from "../../interfaces/notificationInterface";

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
    messagesData: Array<any>;
    tasksData: Array<any>;
    maThemeModel: string = 'green';
    showMenu: boolean = false;
    userEmail: string;
    userName: string;
    userPhoto: string;
    userLogged: boolean;
    // notification:notificationInterface;
    notifications:any[];
    // userLogged:boolean=false;
    existPhoto: boolean = false;

    constructor(private sharedService: SharedService,
                private afAuth: AngularFireAuth,
                private _userService: UserService,
                private _providerService: userProviderService,
                private router:Router
    ) {
        this.showHeader();
        this.uid = sessionStorage.getItem('uid');

        setTimeout(()=>{
            this._providerService.getNotifications(this.uid).then((response:any)=>{
                response.subscribe((result:any)=>{
                    this.numberNotifications = result.length;
                    this.notifications = result;
                })
            })
        },300);

    }

    ngOnInit() {

    }

    setTheme() {
        this.sharedService.setTheme(this.maThemeModel)
    }


    userSignOut() {
        this.afAuth.auth.signOut();
        this.router.navigate(['/login']);
        // window.location.href = '#/login';
    }

    goToCategories(){
        this.router.navigate(['/categorias'])
    }

    goToHire(){
        this.router.navigate(['/prestadores-servicios']);
        // window.location.href='#/prestadores-servicios';
        this.showMenu=false;
    }

    goToFavorites(){
        // window.location.href='#/favoritos';
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
                console.log(error)
            })

    }


    goToLogin(){
        this.router.navigate(['/login']);
    }

    goToDeleteNotification(index:number){
        this._providerService.deleteNotification(index);
    }


}
