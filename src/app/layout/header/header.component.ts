import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../shared/services/shared.service";
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import{Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {window} from "rxjs/operator/window";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [
        './header.component.scss'
    ]
})
export class HeaderComponent implements OnInit {
    messagesData: Array<any>;
    tasksData: Array<any>;
    maThemeModel: string = 'green';
    showMenu: boolean = false;
    userEmail: string;
    userName: string;
    userPhoto: string;
    userLogged: boolean;
    // userLogged:boolean=false;
    existPhoto: boolean = false;

    constructor(private sharedService: SharedService,
                private afAuth: AngularFireAuth,
                private userService: UserService,
                private router:Router) {
        this.showHeader();
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
        this.userService.isAuthenticated()
            .then((response:any) => {
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

    ngOnInit() {
    }
}
