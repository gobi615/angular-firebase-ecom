import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {AngularFireModule} from '@angular/fire'
import { environment } from 'src/environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module/material-module.module';

import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { RouterModule} from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/en-IN';

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'en-IN');

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule,
    AuthModule,
    SharedModule,
    AdminModule,
    RouterModule.forRoot([]),
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
