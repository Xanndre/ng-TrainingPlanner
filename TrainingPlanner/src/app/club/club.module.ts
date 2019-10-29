import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../guards/AuthGuard.service';
import { ClubProfileComponent } from './club-profile/club-profile.component';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { ClubTrainerDialogComponent } from '../shared/club-trainer-dialog/club-trainer-dialog.component';
import { ClubActivityDialogComponent } from '../shared/club-activity-dialog/club-activity-dialog.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PicturesComponent } from './club-profile/pictures/pictures.component';
import { ClubDetailsComponent } from './club-details/club-details.component';
import { ClubListComponent } from './club-list/club-list.component';
import { ClubListItemComponent } from './club-list/club-list-item/club-list-item.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DeleteClubDialogComponent } from '../shared/delete-club-dialog/delete-club-dialog.component';
import { EditGuardService } from '../guards/EditGuard.service';

const routes: Routes = [
  {
    path: 'profile/clubs',
    component: ClubProfileComponent,
    data: { isUser: true, isFavourites: false, edit: false, add: false },
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/clubs/add',
    component: ClubProfileComponent,
    data: { edit: false, add: true },
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/clubs/edit/:id',
    component: ClubProfileComponent,
    data: { edit: true, add: false },
    canActivate: [AuthGuardService, EditGuardService]
  },
  {
    path: 'clubs/user',
    component: ClubListComponent,
    data: { isUser: true, isFavourites: false },
    canActivate: [AuthGuardService]
  },
  {
    path: 'clubs',
    component: ClubListComponent,
    data: { isUser: false, isFavourites: false }
  },
  {
    path: 'clubs/favourites',
    component: ClubListComponent,
    data: { isUser: false, isFavourites: true },
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  declarations: [
    ClubProfileComponent,
    PicturesComponent,
    ClubDetailsComponent,
    ClubListComponent,
    ClubListItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    DragDropModule,
    InfiniteScrollModule,
    RouterModule.forChild(routes)
  ],
  exports: [ClubProfileComponent, ClubDetailsComponent, ClubListComponent],
  entryComponents: [
    ClubTrainerDialogComponent,
    ClubActivityDialogComponent,
    DeleteClubDialogComponent
  ]
})
export class ClubModule {}
