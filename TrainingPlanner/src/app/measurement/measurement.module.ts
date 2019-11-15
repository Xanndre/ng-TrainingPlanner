import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MeasurementListComponent } from './measurement-list/measurement-list.component';
import { AuthGuardService } from '../guards/AuthGuard.service';
import { MeasurementAddComponent } from './measurement-add/measurement-add.component';
import { MeasurementListItemComponent } from './measurement-list/measurement-list-item/measurement-list-item.component';
import { MeasurementDetailsComponent } from './measurement-details/measurement-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {
  MatDialogModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatSelectModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { DeleteMeasurementDialogComponent } from '../shared/delete-measurement-dialog/delete-measurement-dialog.component';

const routes: Routes = [
  {
    path: 'measurements',
    component: MeasurementListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'measurements/add',
    component: MeasurementAddComponent,
    data: { edit: false },
    canActivate: [AuthGuardService]
  },
  {
    path: 'measurements/edit/:id',
    component: MeasurementAddComponent,
    data: { edit: true },
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  declarations: [
    MeasurementAddComponent,
    MeasurementListComponent,
    MeasurementListItemComponent,
    MeasurementDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    NgbModule,
    SharedModule,
    InfiniteScrollModule
  ],
  exports: [
    MeasurementListComponent,
    MeasurementAddComponent,
    MeasurementDetailsComponent
  ],
  entryComponents: [
    MeasurementDetailsComponent,
    ErrorDialogComponent,
    DeleteMeasurementDialogComponent
  ]
})
export class MeasurementModule {}
