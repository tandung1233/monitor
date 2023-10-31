import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { registerLocaleData, LocationStrategy, HashLocationStrategy } from '@angular/common';

import en from '@angular/common/locales/en';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';

import { AdminModule } from '@routes/admin/admin.module';
import { AuthModule } from '@routes/auth/auth.module';
import {AuthInterceptor} from '@routes/auth/auth.interceptor';
import { AppRouting } from './app-routing.module';
import { AppComponent } from './app.component';

// if (!localStorage.getItem('ng-language')) {
//   localStorage.setItem('ng-language', 'en');
// }
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRouting,
    BrowserAnimationsModule,
    AdminModule,
    AuthModule,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: NZ_I18N, useValue: en_US},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
