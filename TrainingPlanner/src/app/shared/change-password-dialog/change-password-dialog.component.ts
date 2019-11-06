import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { ChangePasswordDialogForm } from './change-password-dialog-form';
import { ChangePasswordDialogControls } from './change-password-dialog-controls';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent implements OnInit {
  passwordForm: ChangePasswordDialogForm = new ChangePasswordDialogForm();
  formControls: ChangePasswordDialogControls = new ChangePasswordDialogControls();

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.passwordForm.buildForm(this.formBuilder);
    this.formControls.initializeControls(this.passwordForm);
  }

  changePassword() {}
}
