import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user/user.component';
import { AuthGuardService } from './guards/AuthGuard.service';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
