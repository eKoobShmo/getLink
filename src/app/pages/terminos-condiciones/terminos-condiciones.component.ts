import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-terminos-condiciones',
  templateUrl: './terminos-condiciones.component.html',
  styleUrls: ['./terminos-condiciones.component.scss']
})
export class TerminosCondicionesComponent implements OnInit {

  constructor(private _activeModal:NgbActiveModal) { }

  ngOnInit() {
  }

  closeModal(){
    this._activeModal.dismiss();
  }

}
