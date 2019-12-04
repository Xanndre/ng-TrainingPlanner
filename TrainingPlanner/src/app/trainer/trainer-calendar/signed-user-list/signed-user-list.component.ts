import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signed-user-list',
  templateUrl: './signed-user-list.component.html',
  styleUrls: ['./signed-user-list.component.css']
})
export class SignedUserListComponent implements OnInit {
  isSignList = true;
  trainingId: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.trainingId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
  }
}
