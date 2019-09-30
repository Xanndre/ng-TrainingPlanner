import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import {
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialLoginModule
} from 'angularx-social-login';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];

const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('898551847180018')
  },
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      '1047547908350-l9550g5b4oeodo9spgrctm2cqjg7ihoc.apps.googleusercontent.com'
    )
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    SocialLoginModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  exports: [LoginComponent, RegisterComponent],
  entryComponents: [ErrorDialogComponent]
})
export class AccountModule { }
