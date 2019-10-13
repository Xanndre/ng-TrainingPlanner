import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { TrainerService } from 'src/app/services/Trainer.service';

export interface PeriodicElement {
  id: number;
  name: string;
  validityPeriod: string;
  entries: string;
  price: number;
}

@Component({
  selector: 'app-pricelist-table',
  templateUrl: './pricelist-table.component.html',
  styleUrls: ['./pricelist-table.component.css']
})
export class PricelistTableComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'validityPeriod',
    'entries',
    'price',
    'action'
  ];
  dataSource: PeriodicElement[] = [];

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  constructor(
    public dialog: MatDialog,
    private trainerService: TrainerService
  ) {}
  @Input() userId: string;

  ngOnInit() {
    this.trainerService.getTrainerByUser(this.userId).subscribe(response => {
      if (response !== null) {
        console.log(response);
        response.priceList.forEach(pr => {
          this.dataSource.push({
            id: pr.id,
            name: pr.name,
            validityPeriod: pr.validityPeriod,
            entries: pr.entries,
            price: pr.price
          });
        });
      }
    });
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } else if (result.event === 'Edit') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(rowObj: PeriodicElement) {
    this.dataSource.push({
      id: rowObj.id,
      name: rowObj.name,
      validityPeriod: rowObj.validityPeriod,
      entries: rowObj.entries,
      price: rowObj.price
    });
    this.table.renderRows();
  }

  updateRowData(rowObj) {
    this.dataSource = this.dataSource.filter(value => {
      if (value.id === rowObj.id) {
        value.name = rowObj.name;
        value.validityPeriod = rowObj.validityPeriod;
        value.price = rowObj.price;
        value.entries = rowObj.entries;
      }
      return true;
    });
  }
  deleteRowData(rowObj) {
    this.dataSource = this.dataSource.filter(value => {
      return value.id !== rowObj.id;
    });
  }
}
