import { Component, Input } from '@angular/core';
import { UserTrainingBase } from 'src/app/models/UserStuff/UserTraining/UserTrainingBase';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DeleteUserTrainingDialogComponent } from 'src/app/shared/delete-user-training-dialog/delete-user-training-dialog.component';

@Component({
  selector: 'app-user-training-list-item',
  templateUrl: './user-training-list-item.component.html',
  styleUrls: ['./user-training-list-item.component.css']
})
export class UserTrainingListItemComponent {
  @Input() training: UserTrainingBase;

  constructor(private dialog: MatDialog, private router: Router) {}

  editTraining() {
    this.router.navigate([`/training_creator/edit/${this.training.id}`]);
  }

  deleteTraining() {
    this.openDeleteDialog(
      'Do you really want to delete this training? This process cannot be undone.'
    );
  }

  openDeleteDialog(error: string): void {
    this.dialog.open(DeleteUserTrainingDialogComponent, {
      data: { errorMsg: error, trainingId: this.training.id },
      width: '400px'
    });
  }
}
