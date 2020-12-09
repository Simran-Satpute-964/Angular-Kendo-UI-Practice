import { Component, OnInit } from '@angular/core';
import { KendoGridService } from './kendo-grid.service';

@Component({
  selector: 'app-kendo-grid',
  templateUrl: './kendo-grid.component.html',
  styleUrls: ['./kendo-grid.component.css'],
})
export class KendoGridComponent implements OnInit {
  public gridData: any[] = this.kendoGridService.products;
  public groupBy = [{ field: 'Category.CategoryName' }];

  constructor(private kendoGridService: KendoGridService) {}

  ngOnInit(): void {}
}
