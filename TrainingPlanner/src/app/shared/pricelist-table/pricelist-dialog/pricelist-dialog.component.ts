import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-pricelist-dialog',
  templateUrl: './pricelist-dialog.component.html',
  styleUrls: ['./pricelist-dialog.component.css']
})
export class PricelistDialogComponent {
  action: string;
  localData: any;

  constructor(
    public dialogRef: MatDialogRef<PricelistDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
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
}
