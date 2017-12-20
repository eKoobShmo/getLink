import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-configuration-provider-service',
  templateUrl: './configuration-provider-service.component.html',
  styleUrls: ['./configuration-provider-service.component.scss']
})
export class ConfigurationProviderServiceComponent implements OnInit {
    tab: string = 'miPerfil';
  constructor() { }

  ngOnInit() {
  }

}
