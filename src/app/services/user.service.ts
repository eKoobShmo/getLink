import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {reject} from "q";
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class UserService {

    constructor(private af: AngularFireAuth,
                private db: AngularFireDatabase) {
    }

    isAuthenticated() {
        // this.af.authState
        return new Promise(((resolve, reject) => {
            this.af.auth.onAuthStateChanged(
                response => {
                    if(response){
                        resolve(response);
                    }else{
                        reject();
                    }
                });
        }));
    }

    getUserInfo(){
         return this.db.list('usuarios');
    }

}