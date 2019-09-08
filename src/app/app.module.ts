import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import { AppComponent } from "./app.component";
import { registerLocaleData } from "@angular/common";
import { AngularFireModule } from "angularfire2";
import { environment } from "../environments/environment";
import { AngularFireDatabase } from "@angular/fire/database";
import { AppRoutingModule } from "./app.rounting.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import localePy from "@angular/common/locales/es-PY";
import localePt from "@angular/common/locales/pt";
import localeEn from "@angular/common/locales/en";
import localeEsAr from "@angular/common/locales/es-AR";
import { NgxPermissionsModule } from "ngx-permissions";
import { LoginComponent } from "./login/login.component";
import { FileService } from "./services/file.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ServiceWorkerModule } from "@angular/service-worker";
import { AngularFireMessagingModule } from "@angular/fire/messaging";
import { MessagingService } from "./services/messaging.service";
import { HttpClientModule } from "@angular/common/http";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";

registerLocaleData(localePy, "es");
registerLocaleData(localePt, "pt");
registerLocaleData(localeEn, "en");
registerLocaleData(localeEsAr, "es-Ar");
library.add(fas);
@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
    AngularFireMessagingModule,
    AngularFireStorageModule,
    //AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  exports: [FontAwesomeModule, FormsModule, ReactiveFormsModule],
  providers: [
    AngularFireDatabase,
    AngularFirestore,
    MessagingService,
    { provide: LOCALE_ID, useValue: "es-Ar" },
    FileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
