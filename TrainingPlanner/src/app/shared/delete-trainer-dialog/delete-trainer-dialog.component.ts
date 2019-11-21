import { Component, OnInit, Inject } from '@angular/core';
import { TrainerService } from 'src/app/services/Trainer.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-trainer-dialog',
  templateUrl: './delete-trainer-dialog.component.html',
  styleUrls: ['./delete-trainer-dialog.component.css']
})
export class DeleteTrainerDialogComponent implements OnInit {
  trainerId: number;

  constructor(
    private trainerService: TrainerService,
    private router: Router,
    private dialogRef: MatDialogRef<DeleteTrainerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.trainerId = this.data.trainerId;
  }

  deleteTrainerAccount() {
    this.trainerService.deleteTrainer(this.trainerId).subscribe(() => {
      this.dialogRef.close();
      this.router.navigate(['/profile/user']);
    });
  }
}
