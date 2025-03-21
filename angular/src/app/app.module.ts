import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {SharedModule} from './shared/shared.module';

import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';
import {HttpClientModule} from '@angular/common/http';
import { JwtModule} from '@auth0/angular-jwt';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

export function tokenGetter(): string {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost'],
      },
    }),
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
