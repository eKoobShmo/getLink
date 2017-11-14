import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {userProviderService} from "../../../services/userProvider.service";
import {ServicesInterface} from "../../../interfaces/services.interface";

@Component({
  selector: 'app-lista-prestadores-servicios',
  templateUrl: './lista-prestadores-servicios.component.html',
  styleUrls: ['./lista-prestadores-servicios.component.scss']
})
export class ListaPrestadoresServiciosComponent implements OnInit {

  services:Observable<ServicesInterface[]>;
  myFavorites:Observable<any[]>;

  constructor(private userProviderService:userProviderService) { }

  ngOnInit() {
    this.services = this.userProviderService.getServices();

    this.services.subscribe(result =>{
        for(let i = 0; i < result.length; i++){

        }
    })
  }

  verifyFavorite(providerKey:string){

  }

}
