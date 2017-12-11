import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HireServiceComponent} from "../../../modals/hire-service/hire-service.component";

@Component({
  selector: 'app-lista-prestadores-servicios',
  templateUrl: './lista-prestadores-servicios.component.html',
  styleUrls: ['./lista-prestadores-servicios.component.scss']
})
export class ListaPrestadoresServiciosComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

    open() {
        this.modalService.open(HireServiceComponent);
    }

}
