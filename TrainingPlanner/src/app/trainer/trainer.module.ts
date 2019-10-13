import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerAddComponent } from './trainer-add/trainer-add.component';
import { AuthGuardService } from '../guards/AuthGuard.service';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { PricelistTableComponent } from './trainer-add/pricelist-table/pricelist-table.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogBoxComponent } from './trainer-add/pricelist-table/dialog-box/dialog-box.component';
import {
  MatFormFieldModule,
  MatInputModule,
  MatChipsModule
} from '@angular/material';

const routes: Routes = [
  {
    path: 'trainer/add',
    component: TrainerAddComponent,
    canActivate: [AuthGuardService],
    data: { edit: false }
  },
  {
    path: 'trainer/edit',
    component: TrainerAddComponent,
    canActivate: [AuthGuardService],
    data: { edit: true }
  }
];

@NgModule({
  declarations: [
    TrainerAddComponent,
    PricelistTableComponent,
    DialogBoxComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [TrainerAddComponent],
  entryComponents: [DialogBoxComponent]
})
export class TrainerModule {}
