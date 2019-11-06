import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/Login.service';

@Component({
  selector: 'app-confirm-error',
  templateUrl: './confirm-error.component.html',
  styleUrls: ['./confirm-error.component.css']
})
export class ConfirmErrorComponent implements OnInit {
  userId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
  }

  send() {
    this.loginService.sendEmailAgain(this.userId).subscribe(() => {
      this.router.navigate(['/confirm']);
    });
  }
}
