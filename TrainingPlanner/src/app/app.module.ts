import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AccountModule } from './account/account.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModule } from './user/user.module';
import { NavbarModule } from './navbar/navbar.module';
import { TrainerModule } from './trainer/trainer.module';
import { ClubModule } from './club/club.module';
import { FavouriteModule } from './favourite/favourite.module';
import { CardModule } from './card/card.module';
import { PartnerModule } from './partner/partner.module';

export function getToken(): string {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AccountModule,
    ClubModule,
    CardModule,
    NavbarModule,
    PartnerModule,
    SharedModule,
    TrainerModule,
    FavouriteModule,
    UserModule,
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
