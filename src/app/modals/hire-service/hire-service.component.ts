import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {providerInterface} from "../../interfaces/perfil_ps.interface";
import {userProviderService} from "../../services/userProvider.service";
import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from "angularfire2/auth";
import {UserService} from "../../services/user.service";
import {userInfoInterface} from "../../interfaces/userInfo";
import {UpdateInfoComponent} from "../update-info/update-info.component";


@Component({
  selector: 'app-hire-service',
  templateUrl: './hire-service.component.html',
  styleUrls: ['./hire-service.component.scss']
})
export class HireServiceComponent implements OnInit {

  @Input() keyPrestador;
  infoProviderTemp: any;
  infoUser:any;
  viewMessage:boolean=false;
  emptyFields:boolean=false;

  constructor(private _userProviderService: userProviderService,
              private _userService:UserService,
              private _modalService:NgbModal) {
    this._userService.isAuthenticated().then((response:any)=>{
      this.infoUser=response;
    });

  }

  ngOnInit() {
      this._userProviderService.getProviderInfoHire(this.keyPrestador).subscribe((result:any)=>{
          this.infoProviderTemp=result;
      });
      this.verifyFieldsUser(this.infoUser);
      console.log(this.infoProviderTemp)
  }

    verifyFieldsUser(field:userInfoInterface){
      if((field.email=="" || field.email==null)||(field.telefono==null)||(field.domicilio==null)){
          this.emptyFields=true;
      }
    }

    openUpdateInfo(){
      this._modalService.open(UpdateInfoComponent)
    }


}
