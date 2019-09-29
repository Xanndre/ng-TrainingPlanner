import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AccountModule } from './account/account.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModule } from './user/user.module';
import { MatButtonModule } from '@angular/material/button';

export function getToken(): string {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AccountModule,
    SharedModule,
    UserModule,
    MatButtonModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule {}
