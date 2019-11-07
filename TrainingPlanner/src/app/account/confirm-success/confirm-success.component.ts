import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-success',
  templateUrl: './confirm-success.component.html',
  styleUrls: ['./confirm-success.component.css']
})
export class ConfirmSuccessComponent implements OnInit {
  isReset: boolean;
  isLoaded: boolean;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.isReset = this.route.snapshot.data.reset;
    this.isLoaded = true;
  }

  signIn() {
    this.router.navigate(['/login']);
  }
}
