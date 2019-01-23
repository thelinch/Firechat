import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { PersonaModule } from './persona/persona.module';
import { AppRoutingModule } from './app.rounting';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { BlockUIModule } from 'ng-block-ui';
import localePy from '@angular/common/locales/es-PY';
import localePt from '@angular/common/locales/pt';
import localeEn from '@angular/common/locales/en';
import localeEsAr from '@angular/common/locales/es-AR';
import { NgxPermissionsModule } from 'ngx-permissions';
import { LoginComponent } from './login/login.component';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { FileService } from './services/file.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
registerLocaleData(localePy, 'es');
registerLocaleData(localePt, 'pt');
registerLocaleData(localeEn, 'en')
registerLocaleData(localeEsAr, 'es-Ar');
library.add(fas);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BlockUIModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    FontAwesomeModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PersonaModule,
  ],
  exports: [FontAwesomeModule, FormsModule,
    ReactiveFormsModule,],
  providers: [AngularFireDatabase, { provide: LOCALE_ID, useValue: 'es-Ar' }, FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
