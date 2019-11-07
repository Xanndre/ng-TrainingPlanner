import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-error-user',
  templateUrl: './confirm-error-user.component.html',
  styleUrls: ['./confirm-error-user.component.css']
})
export class ConfirmErrorUserComponent {
  constructor(private router: Router) {}

  register() {
    this.router.navigate(['/register']);
  }
}
