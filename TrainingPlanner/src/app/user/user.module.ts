import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../guards/AuthGuard.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DeleteUserDialogComponent } from '../shared/delete-user-dialog/delete-user-dialog.component';
import { UserListItemComponent } from './user-list/user-list-item/user-list-item.component';
import { UserListComponent } from './user-list/user-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ClubCardGuardService } from '../guards/ClubCardGuard.service';
import { TrainerCardGuardService } from '../guards/TrainerCardGuard.service';

const routes: Routes = [
  {
    path: 'profile/user',
    component: UserProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    redirectTo: 'profile/user',
    pathMatch: 'full'
  },
  {
    path: 'clubs/:clubId/users',
    component: UserListComponent,
    canActivate: [AuthGuardService, ClubCardGuardService]
  },
  {
    path: 'trainers/:trainerId/users',
    component: UserListComponent,
    canActivate: [AuthGuardService, TrainerCardGuardService]
  }
];

@NgModule({
  declarations: [
    UserProfileComponent,
    UserListComponent,
    UserListItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    NgbModule,
    InfiniteScrollModule
  ],
  exports: [UserProfileComponent, UserListComponent],
  entryComponents: [DeleteUserDialogComponent]
})
export class UserModule {}
