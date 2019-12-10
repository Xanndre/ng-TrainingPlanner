import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/Notification.service';
import { NotificationInfo } from 'src/app/models/Notification/NotificationInfo';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from 'src/app/shared/success-dialog/success-dialog.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notification: NotificationInfo;
  userId: string;
  isLoaded: boolean;

  constructor(
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.notificationService
      .getNotification(this.userId)
      .subscribe(response => {
        this.notification = response;
        this.isLoaded = true;
      });
  }

  editNotification() {
    this.notificationService.updateNotification(this.notification).subscribe(
      () => {
        this.showSuccess('Changes have been saved.');
      },
      () => {
        this.showError('Invalid trainer profile creation attempt.');
      }
    );
  }

  showError(error: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { errorMsg: error },
      width: '400px'
    });
  }

  showSuccess(error: string): void {
    this.dialog.open(SuccessDialogComponent, {
      data: { message: error },
      width: '400px'
    });
  }
}
