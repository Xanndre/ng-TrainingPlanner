import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-error',
  templateUrl: './confirm-error.component.html',
  styleUrls: ['./confirm-error.component.css']
})
export class ConfirmErrorComponent {
  constructor(private router: Router) {}

  send() {
    // here implement sending email with confirmation link
    this.router.navigate(['/confirm']);
  }
}
