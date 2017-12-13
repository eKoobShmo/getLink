import { Component, OnInit} from '@angular/core';
import {ListaPrestadoresServiciosComponent} from "../../../pages/prestadores-servicios/lista-prestadores-servicios/lista-prestadores-servicios.component";

@Component({
  selector: 'header-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  searchActive:boolean = false;
  searchValue:string = '';
  searchFocused:boolean = false;
  static searchService:string;

    constructor(private _listaPrestadoresServicios:ListaPrestadoresServiciosComponent) { }

    ngOnInit() {
    }

  closeSearch() {
    this.searchActive = false; // Close the search block
    this.searchValue = null; // Empty the search field
    this.searchFocused = false;
  }

    sendSearchValue(texto:string){
      SearchValues.stringToSearch = texto;
      this._listaPrestadoresServicios.searchServiceProviders(SearchValues.stringToSearch);
    }

}
export class SearchValues {
    public static stringToSearch: string;
}