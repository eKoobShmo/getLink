import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Globals} from "../../services/globals.service";

@Component({
    selector: 'app-configuration-provider-service',
    templateUrl: './configuration-provider-service.component.html',
    styleUrls: ['./configuration-provider-service.component.scss']
})
export class ConfigurationProviderServiceComponent implements OnInit {
    tab: string = 'miPerfil';
    uid: string;
    enableTabProvider:boolean;


    constructor(private _usrService: UserService) {
        this._usrService.isAuthenticated().then((response: any) => {
            this.uid = response.uid;
        });

    }

    ngOnInit() {
        setTimeout(() => {
            this._usrService.getInfoUser(this.uid).subscribe((response: any) => {
                if(response.isProvider){
                    this.enableTabProvider = true;
                }else{
                    this.enableTabProvider = false;
                }
            })
        }, 300)


    }


}
