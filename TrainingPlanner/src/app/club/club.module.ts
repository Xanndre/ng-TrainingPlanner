import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../guards/AuthGuard.service';
import { ClubProfileComponent } from './club-profile/club-profile.component';
import { SharedModule } from '../shared/shared.module';
import {
  MatCardModule,
  MatButtonModule,
  MatTableModule
} from '@angular/material';
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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClubReviewListComponent } from './club-review-list/club-review-list.component';
import { ClubReviewListItemComponent } from './club-review-list/club-review-list-item/club-review-list-item.component';
import { ReviewDialogComponent } from '../shared/review-dialog/review-dialog.component';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { ClubGuardService } from '../guards/ClubGuard.service';

const routes: Routes = [
  {
    path: 'profile/clubs',
    component: ClubProfileComponent,
    data: { isUser: true, edit: false, add: false },
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/clubs/add',
    component: ClubProfileComponent,
    data: { edit: false, add: true },
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/clubs/edit/:clubId',
    component: ClubProfileComponent,
    data: { edit: true, add: false },
    canActivate: [AuthGuardService, ClubGuardService]
  },
  {
    path: 'clubs/user',
    component: ClubListComponent,
    data: { isUser: true },
    canActivate: [AuthGuardService]
  },
  {
    path: 'clubs',
    component: ClubListComponent,
    data: { isUser: false }
  },
  {
    path: 'clubs/:id',
    component: ClubDetailsComponent
  },
  {
    path: 'clubs/:id/reviews',
    component: ClubReviewListComponent
  }
];

@NgModule({
  declarations: [
    ClubProfileComponent,
    PicturesComponent,
    ClubDetailsComponent,
    ClubListComponent,
    ClubListItemComponent,
    ClubReviewListComponent,
    ClubReviewListItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatCardModule,
    MatExpansionModule,
    NgbModule,
    MatTableModule,
    MatButtonModule,
    DragDropModule,
    InfiniteScrollModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ClubProfileComponent,
    ClubDetailsComponent,
    ClubListComponent,
    ClubReviewListComponent
  ],
  entryComponents: [
    ClubTrainerDialogComponent,
    ClubActivityDialogComponent,
    ReviewDialogComponent,
    DeleteClubDialogComponent,
    ErrorDialogComponent
  ]
})
export class ClubModule {}
