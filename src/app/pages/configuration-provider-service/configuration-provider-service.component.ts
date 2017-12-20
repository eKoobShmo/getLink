import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
    selector: 'app-configuration-provider-service',
    templateUrl: './configuration-provider-service.component.html',
    styleUrls: ['./configuration-provider-service.component.scss']
})
export class ConfigurationProviderServiceComponent implements OnInit {
    tab: string = 'miPerfil';
    uid: string;

    constructor(private _usrService: UserService) {

    }

    ngOnInit() {


    }


}
