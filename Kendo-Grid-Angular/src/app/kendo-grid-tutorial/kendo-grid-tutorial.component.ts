import { Component, OnInit } from '@angular/core';
import { products } from '../products';

@Component({
  selector: 'app-kendo-grid-tutorial',
  templateUrl: './kendo-grid-tutorial.component.html',
  styleUrls: ['./kendo-grid-tutorial.component.css'],
})
export class KendoGridTutorialComponent implements OnInit {
  public gridData: any[] = products;
  public groupBy = [{ field: 'Category.CategoryName' }];

  constructor() {}

  ngOnInit(): void {}
}
