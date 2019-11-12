import { Component, OnInit } from '@angular/core';
import { Partner } from 'src/app/models/User/Partner';
import { UserService } from 'src/app/services/User.service';

@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.css']
})
export class PartnerListComponent implements OnInit {
  partners: Partner[];
  userId: string;

  totalPages: number;
  totalCount: number;
  pageSize = 5;
  currentPage: number;

  isLoaded = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.getPartners(1, true);
  }

  getPartners(pageNumber: number, isClear: boolean = false) {
    if (isClear) {
      this.partners = [];
    }
    this.userService
      .getPartners(pageNumber, this.pageSize, this.userId)
      .subscribe(response => {
        console.log(response);
        this.partners.push(...response.partners);
        this.totalPages = response.totalPages;
        this.totalCount = response.totalCount;
        this.currentPage = pageNumber;
        this.isLoaded = true;
      });
  }

  onScrollDown() {
    if (this.currentPage + 1 <= this.totalPages) {
      this.getPartners(this.currentPage + 1);
    }
  }
}
