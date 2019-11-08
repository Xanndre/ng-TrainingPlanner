import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { TrainerService } from 'src/app/services/Trainer.service';
import { PricelistDialogComponent } from './pricelist-dialog/pricelist-dialog.component';
import { ClubService } from 'src/app/services/Club.service';
import { Price } from 'src/app/models/Stuff/Price';

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
  @Input() dataSource: Price[] = [];
  isLoaded: boolean;
  counter = 0;

  @Input() userId: string;
  @Input() clubId: number;
  @Input() isDisabled: boolean;

  @Output() priceListChange = new EventEmitter<Price[]>();

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(
    public dialog: MatDialog,
    private trainerService: TrainerService,
    private clubService: ClubService
  ) {}

  ngOnInit() {
    if (this.userId !== null) {
      this.trainerService.getTrainerByUser(this.userId).subscribe(response => {
        this.setPriceListData(response);
      });
    } else {
      this.clubService.getClub(this.clubId).subscribe(response => {
        this.setPriceListData(response);
      });
    }
  }

  setPriceListData(response: any) {
    if (response !== null) {
      response.priceList.forEach(pr => {
        this.dataSource.push({
          id: pr.id,
          name: pr.name,
          validityPeriod: pr.validityPeriod,
          unlimitedValidityPeriod: pr.unlimitedValidityPeriod,
          entries: pr.entries,
          unlimitedEntries: pr.unlimitedEntries,
          price: pr.price
        });
      });
    }
    this.table.renderRows();
    this.isLoaded = true;
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(PricelistDialogComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result.event === 'Add') {
          this.addRowData(result.data);
        } else if (result.event === 'Edit') {
          this.updateRowData(result.data);
        } else if (result.event === 'Delete') {
          this.deleteRowData(result.data);
        }
      }
    });
  }

  addRowData(rowObj: Price) {
    this.dataSource.push({
      id: rowObj.id !== undefined ? rowObj.id : this.counter++,
      name: rowObj.name,
      validityPeriod: !rowObj.unlimitedValidityPeriod
        ? rowObj.validityPeriod
        : 0,
      unlimitedValidityPeriod: rowObj.unlimitedValidityPeriod,
      entries: !rowObj.unlimitedEntries ? rowObj.entries : 0,
      unlimitedEntries: rowObj.unlimitedEntries,
      price: rowObj.price
    });
    this.table.renderRows();
    this.priceListChange.emit(this.dataSource);
  }

  updateRowData(rowObj) {
    this.dataSource = this.dataSource.filter(value => {
      if (value.id === rowObj.id) {
        value.name = rowObj.name;
        value.validityPeriod = !rowObj.unlimitedValidityPeriod
          ? rowObj.validityPeriod
          : 0;
        value.unlimitedValidityPeriod = rowObj.unlimitedValidityPeriod;
        value.price = rowObj.price;
        value.entries = !rowObj.unlimitedEntries ? rowObj.entries : 0;
        value.unlimitedEntries = rowObj.unlimitedEntries;
      }
      return true;
    });
    this.priceListChange.emit(this.dataSource);
  }
  deleteRowData(rowObj) {
    this.dataSource = this.dataSource.filter(value => {
      return value.name !== rowObj.name;
    });
    this.priceListChange.emit(this.dataSource);
  }
}
