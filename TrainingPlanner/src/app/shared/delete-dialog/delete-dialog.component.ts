import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataTransferService } from 'src/app/services/DataTransfer.service';
import { TrainerService } from 'src/app/services/Trainer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  trainerId: number;

  constructor(
    private dataTransferService: DataTransferService,
    private trainerService: TrainerService,
    private router: Router,
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.trainerId = this.dataTransferService.getTrainerId();
  }

  deleteTrainerAccount() {
    this.trainerService.deleteTrainer(this.trainerId).subscribe(() => {
      this.dialogRef.close();
      this.router.navigate(['/profile/user']);
    });
  }
}
