import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../guards/AuthGuard.service';
import {
  MatCheckboxModule,
  MatCardModule,
  MatButtonModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../shared/success-dialog/success-dialog.component';

const routes: Routes = [
  {
    path: 'profile/notifications',
    component: NotificationComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    FormsModule
  ],
  exports: [NotificationComponent],
  entryComponents: [ErrorDialogComponent, SuccessDialogComponent]
})
export class NotificationModule {}
