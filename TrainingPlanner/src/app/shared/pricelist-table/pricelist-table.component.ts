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
import { TrainerPriceCreate } from 'src/app/models/TrainerPriceCreate';

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
  @Input() dataSource: TrainerPriceCreate[] = [];
  isLoaded: boolean;
  counter = 0;

  @Input() userId: string;
  @Input() isDisabled: boolean;

  @Output() priceListChange = new EventEmitter<TrainerPriceCreate[]>();

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(
    public dialog: MatDialog,
    private trainerService: TrainerService
  ) {}

  ngOnInit() {
    this.trainerService.getTrainerByUser(this.userId).subscribe(response => {
      if (response !== null) {
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
      this.table.renderRows();
      this.isLoaded = true;
    });
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

  addRowData(rowObj: TrainerPriceCreate) {
    this.dataSource.push({
      id: rowObj.id !== undefined ? rowObj.id : this.counter++,
      name: rowObj.name,
      validityPeriod: rowObj.validityPeriod,
      entries: rowObj.entries,
      price: rowObj.price
    });
    this.table.renderRows();
    this.priceListChange.emit(this.dataSource);
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
    this.priceListChange.emit(this.dataSource);
  }
  deleteRowData(rowObj) {
    this.dataSource = this.dataSource.filter(value => {
      return value.name !== rowObj.name;
    });
    this.priceListChange.emit(this.dataSource);
  }
}
