import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CryptoOpenClose } from '../models/CryptoOpenClose';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  @Input('currencyDetails') currencyDetails: CryptoOpenClose[] = [];
  dataSource = new MatTableDataSource<CryptoOpenClose>();

  displayedColumns = ["name", "symbol", "open", "close", "change"]

  constructor() { }
  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = new MatTableDataSource<CryptoOpenClose>(this.currencyDetails)
  }

  calculatePercentDiff(a:number, b:number){
    return 100 * Math.abs( (a - b) / ( (a+b)/2 ) );
  }

  ngOnInit(): void {
  }

}
