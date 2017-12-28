import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { LayoutRouting } from "./layout.routing";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import {ButtonsModule, Ng2BootstrapModule} from 'ngx-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LayoutComponent } from "./layout.component";
import { HeaderComponent } from './header/header.component';
import {SearchComponent, SearchValues} from './header/search/search.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NavigationTriggerComponent } from './header/navigation-trigger/navigation-trigger.component';
import {AbbreviateTextPipe} from "../pipes/abbreviate-text.pipe";
import {AcercaDeComponent} from "../pages/perfil-ps/acerca-de/acerca-de.component";
import {GaleriaComponent} from "../pages/perfil-ps/galeria/galeria.component";
import {UbicacionComponent} from "../pages/perfil-ps/ubicacion/ubicacion.component";
import {PerfilPSComponent, ProviderInfo} from "../pages/perfil-ps/perfil-ps.component";
import {alertService} from "../services/alert.service";
import {userProviderService} from "../services/userProvider.service";
import {CargaMultimediaService} from "../services/carga-archivos.service.";
import {ComentarioComponent} from "../pages/perfil-ps/tab-comentario/comentario/comentario.component";
import {TabComentarioComponent} from "../pages/perfil-ps/tab-comentario/tab-comentario.component";
import {PrestadoresServiciosComponent} from "../pages/prestadores-servicios/prestadores-servicios.component";
import {FiltrosComponent} from "../pages/prestadores-servicios/filtros/filtros.component";
import {ListaPrestadoresServiciosComponent} from "../pages/prestadores-servicios/lista-prestadores-servicios/lista-prestadores-servicios.component";
import {EnviarComentarioComponent} from "../pages/perfil-ps/tab-comentario/enviar-comentario/enviar-comentario.component";
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabase} from "angularfire2/database";
import {FormatDatePipe} from "../pipes/formatDate.pipe";


import {NgbModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {GalleryComponent} from "../modals/gallery/gallery.component";
import {ModalMultimediaService} from "../services/modal-multimedia.service";
import {ReportComponent} from "../modals/report/report.component";
import {CargaComponent} from "../modals/carga/carga.component";
import {DropImagesDirective} from "../directives/drop-images.directive";
import {AbbreviateNamePipe} from "../pipes/abbreviateName";
import {LoginModalComponent} from "../pages/login/login-modal/login-modal.component";
import {UserService} from "../services/user.service";
import {LoginComponent} from "../pages/login/login.component";
import {HireServiceComponent} from "../modals/hire-service/hire-service.component";
import {UpdateInfoComponent} from "../modals/update-info/update-info.component";
import Global = NodeJS.Global;
import {Globals} from "../services/globals.service";
import {Broadcaster} from "../../assets/js/broadcaster";
import {ValidationService} from "../services/validation.service";
import {FavoritosComponent} from "../pages/favoritos/favoritos.component";
import {ConfigurationProviderServiceComponent} from "../pages/configuration-provider-service/configuration-provider-service.component";
import {MyProfileComponent} from "../pages/configuration-provider-service/my-profile/my-profile.component";
import {MyServiceComponent} from "../pages/configuration-provider-service/my-service/my-service.component";
import {LoadImagesComponent} from "../pages/configuration-provider-service/load-images/load-images.component";
import {TrabajosRealizadosComponent} from "../modals/trabajos-realizados/trabajos-realizados.component";
import {CalificarServicioComponent} from "../modals/calificar-servicio/calificar-servicio.component";



// const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
//     suppressScrollX: true
// }

@NgModule ({
    declarations: [
        LayoutComponent,
        HeaderComponent,
        SearchComponent,
        NavigationComponent,
        NavigationTriggerComponent,
        AbbreviateTextPipe,
        AcercaDeComponent,
        PerfilPSComponent,
        GaleriaComponent,
        TabComentarioComponent,
        ComentarioComponent,
        UbicacionComponent,
        UbicacionComponent,
        PrestadoresServiciosComponent,
        FiltrosComponent,
        ListaPrestadoresServiciosComponent,
        EnviarComentarioComponent,
        FormatDatePipe,
        DropImagesDirective,
        AbbreviateNamePipe,
        GalleryComponent,
        ReportComponent,
        CargaComponent,
        LoginModalComponent,
        HireServiceComponent,
        UpdateInfoComponent,
        FavoritosComponent,
        ConfigurationProviderServiceComponent,
        MyProfileComponent,
        MyServiceComponent,
        LoadImagesComponent,
        TrabajosRealizadosComponent,
        CalificarServicioComponent

    ],
    imports: [
        CommonModule,
        LayoutRouting,
        FormsModule,
        AngularFireModule,
        BsDropdownModule.forRoot(),
        ProgressbarModule.forRoot(),
        ButtonsModule.forRoot(),
        PerfectScrollbarModule.forChild(),
        NgbModule.forRoot(),
        NgbModule
    ],
    providers: [
        alertService,
        AngularFireDatabase,
        userProviderService,
        CargaMultimediaService,
        CargaComponent,
        NgbActiveModal,
        NgbModal,
        ModalMultimediaService,
        UserService,
        ProviderInfo,
        Globals,
        SearchValues,
        ListaPrestadoresServiciosComponent,
        Broadcaster,
        ValidationService

    ],
    entryComponents:[
        UpdateInfoComponent,
        TrabajosRealizadosComponent,
        CalificarServicioComponent
    ]
})

export class LayoutModule {  }