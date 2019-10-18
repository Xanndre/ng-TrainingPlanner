import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-clubtrainer-add-dialog',
  templateUrl: './clubtrainer-add-dialog.component.html',
  styleUrls: ['./clubtrainer-add-dialog.component.css']
})
export class ClubtrainerAddDialogComponent {
  action: string;
  localData: any;
  constructor(
    private dialogRef: MatDialogRef<ClubtrainerAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
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
