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
import { MeasurementModule } from './measurement/measurement.module';
import { DateAdapter } from '@angular/material';
import { CustomDateAdapter } from './shared/custom-date-adapter/custom-date-adapter';
import { CreatorModule } from './creator/creator.module';
import { NotificationModule } from './notification/notification.module';

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
    CreatorModule,
    MeasurementModule,
    NavbarModule,
    PartnerModule,
    SharedModule,
    TrainerModule,
    FavouriteModule,
    NotificationModule,
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
  providers: [
    JwtHelperService,
    { provide: DateAdapter, useClass: CustomDateAdapter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-en');
  }
}
