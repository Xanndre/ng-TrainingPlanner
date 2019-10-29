import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/services/User.service';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.css']
})
export class DeleteUserDialogComponent implements OnInit {
  userId: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
  }

  deleteAccount() {
    this.userService.deleteUser(this.userId).subscribe(() => {
      this.dialogRef.close();
      localStorage.removeItem('jwt');
      this.router.navigate(['/login']);
    });
  }
}
