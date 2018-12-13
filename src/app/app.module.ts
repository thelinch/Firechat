import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from "@angular/forms"
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
import { AgmCoreModule } from '@agm/core';
registerLocaleData(localePy, 'es');
registerLocaleData(localePt, 'pt');
registerLocaleData(localeEn, 'en')
registerLocaleData(localeEsAr, 'es-Ar');
library.add(fas);
@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    BlockUIModule.forRoot(),
    AngularFireAuthModule,
    FontAwesomeModule,
    AppRoutingModule,
    FormsModule,
    PersonaModule,
  

  ],
  exports: [FontAwesomeModule],
  providers: [AngularFireDatabase, { provide: LOCALE_ID, useValue: 'es-Ar' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
