import { Component, OnInit, Inject } from '@angular/core';
import { ClubService } from 'src/app/services/Club.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-club-dialog',
  templateUrl: './delete-club-dialog.component.html',
  styleUrls: ['./delete-club-dialog.component.css']
})
export class DeleteClubDialogComponent implements OnInit {
  clubId: number;
  userId: string;
  clubQuantity: number;
  isClubsLoaded: boolean;

  constructor(
    private clubService: ClubService,
    private router: Router,
    private dialogRef: MatDialogRef<DeleteClubDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.clubId = this.data.clubId;
  }

  deleteClubAccount() {
    this.clubService.deleteClub(this.clubId).subscribe(() => {
      this.dialogRef.close();
      this.getClubQuantity();
    });
  }

  getClubQuantity() {
    this.clubService.getClubQuantity(this.userId).subscribe(response => {
      if (response !== 0) {
        this.router.navigate(['/profile/clubs']);
      } else {
        this.router.navigate(['/profile/user']);
      }
    });
  }
}
