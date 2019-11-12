import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../guards/AuthGuard.service';
import { TrainingPartnerComponent } from './training-partner/training-partner.component';
import {
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatCardModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PartnerListComponent } from './partner-list/partner-list.component';
import { PartnerListItemComponent } from './partner-list/partner-list-item/partner-list-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const routes: Routes = [
  {
    path: 'partners',
    component: TrainingPartnerComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  declarations: [
    TrainingPartnerComponent,
    PartnerListComponent,
    PartnerListItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatStepperModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    InfiniteScrollModule
  ],
  exports: [TrainingPartnerComponent, PartnerListComponent]
})
export class PartnerModule {}
