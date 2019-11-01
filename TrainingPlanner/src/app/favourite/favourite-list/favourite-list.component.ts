import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourite-list',
  templateUrl: './favourite-list.component.html',
  styleUrls: ['./favourite-list.component.css']
})
export class FavouriteListComponent implements OnInit {
  isFavourite = true;

  constructor() {}

  ngOnInit() {}
}
