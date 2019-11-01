import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouriteListComponent } from './favourite-list/favourite-list.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../guards/AuthGuard.service';
import { MatTabsModule } from '@angular/material/tabs';
import { TrainerModule } from '../trainer/trainer.module';
import { ClubModule } from '../club/club.module';

const routes: Routes = [
  {
    path: 'favourites',
    component: FavouriteListComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  declarations: [FavouriteListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    ClubModule,
    TrainerModule
  ],
  exports: [FavouriteListComponent]
})
export class FavouriteModule {}
