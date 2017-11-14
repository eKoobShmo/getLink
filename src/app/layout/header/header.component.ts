import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../shared/services/shared.service";
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import{Router} from "@angular/router";
import {UserService} from "../../services/user.service";

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
        window.location.href = '#/login';
    }

    showHeader() {
        this.userService.isAuthenticated()
            .then(response => {
                this.userLogged = true;
                this.userEmail = response.email;
                this.userName = response.displayName;
                this.userPhoto = response.photoURL;
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
