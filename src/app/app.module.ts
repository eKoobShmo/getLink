import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { SharedService } from "./shared/services/shared.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {alertService} from "./services/alert.service";

import { TerminosCondicionesComponent } from './pages/terminos-condiciones/terminos-condiciones.component';
import {LoginComponent} from "./pages/login/login.component";

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import {PerfectScrollbarConfigInterface, PerfectScrollbarModule} from "ngx-perfect-scrollbar";

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
}

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        TerminosCondicionesComponent

    ],
    imports: [
        FormsModule,
        BrowserAnimationsModule,
        HttpModule,
        routing,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule, // imports firebase/database, only needed for database features
        AngularFireAuthModule,
        NgbModule.forRoot(),
        PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
        NgbModule


    ],
    providers: [
        SharedService,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        alertService
    ],
    entryComponents:[
        TerminosCondicionesComponent
    ],
    bootstrap: [AppComponent]
})



export class AppModule {
}
