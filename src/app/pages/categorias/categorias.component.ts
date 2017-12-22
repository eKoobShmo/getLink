import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {CategoriasService} from '../../services/categorias.service';
import {CategoriesInterface} from '../../interfaces/categorias.interface';
import { ActivatedRoute, Router } from '@angular/router';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  uid:string;
  categoria:CategoriesInterface[] = [];
  constructor( private afAuth: AngularFireAuth,
               private ServicioCategorias:CategoriasService,
               private activeRoute: ActivatedRoute,
               private router: Router,
               private _userService:UserService) {

    this._userService.isAuthenticated().then((response:any)=>{
      this.uid = response.uid;
      sessionStorage.setItem('uid' , this.uid);
    });

    afAuth.auth.onAuthStateChanged( (user) =>{
      if(user == null){
        this.router.navigate(['#/login'])
      }
    });

      this.categoria=this.ServicioCategorias.getCategoriasServicio();

  }

  ngOnInit() {

  }

  goTohire(){
    window.location.href="#/prestadores-servicios";
  }

  verServicio(id:string){
    this.router.navigate(['/usuarios', id]);
    for(let c in this.categoria){
      if(id == this.categoria[c].id){
        console.log(this.categoria[c]);
      }
    }
  }

}
