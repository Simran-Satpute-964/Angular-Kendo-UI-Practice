import { Component, OnInit } from '@angular/core';
import { products } from '../products';
import {
  GridDataResult,
  DataStateChangeEvent,
} from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { CategoriesService } from '../northwind.service';
import { State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-data-types',
  templateUrl: './data-types.component.html',
  styleUrls: ['./data-types.component.css'],
})
export class DataTypesComponent implements OnInit {
  public columns: any[] = [
    { field: 'ProductID' },
    { field: 'ProductName' },
    { field: 'QuantityPerUnit' },
  ];
  public bindingType: String = 'array';
  public view: Observable<GridDataResult>;
  public gridData: any = products;
  public gridDataResult: GridDataResult = {
    data: products,
    total: products.length,
  };

  constructor(public service: CategoriesService) {
    this.view = service;
  }

  ngOnInit(): void {}

  changeBindingType(e) {
    switch (this.bindingType) {
      case 'array': {
        this.columns = [
          { field: 'ProductID' },
          { field: 'ProductName' },
          { field: 'QuantityPerUnit' },
        ];
        this.gridData = products;
        break;
      }
      case 'gridDataResult': {
        this.columns = [
          { field: 'ProductID' },
          { field: 'ProductName' },
          { field: 'QuantityPerUnit' },
        ];
        this.gridData = this.gridDataResult;
        break;
      }
      case 'async': {
        const state: State = { skip: 0, take: 100 };
        this.columns = [
          { field: 'CategoryID' },
          { field: 'CategoryName' },
          { field: 'Description' },
        ];
        this.service.query(state);
        this.view.subscribe((res) => {
          this.gridData = res;
        });
        break;
      }
    }
  }
}
