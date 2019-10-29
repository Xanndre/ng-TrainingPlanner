import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-club-activity-dialog',
  templateUrl: './club-activity-dialog.component.html',
  styleUrls: ['./club-activity-dialog.component.css']
})
export class ClubActivityDialogComponent {
  action: string;
  localData: any;
  constructor(
    private dialogRef: MatDialogRef<ClubActivityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.localData = { ...data };
    this.action = this.localData.action;
  }
  doAction() {
    this.dialogRef.close({ event: this.action, data: this.localData });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  changePictureListener($event): void {
    this.readPicture($event.target);
  }

  readPicture(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = () => {
      this.localData.picture = myReader.result.toString();
    };
    myReader.readAsDataURL(file);
  }
}
