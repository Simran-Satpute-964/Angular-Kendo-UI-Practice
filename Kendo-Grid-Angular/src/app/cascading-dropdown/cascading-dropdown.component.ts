import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from './products.service';
import { categories } from './categories';

const createFormGroup = (dataItem) =>
  new FormGroup({
    ProductID: new FormControl(dataItem.ProductID),
    ProductName: new FormControl(dataItem.ProductName, Validators.required),
    UnitPrice: new FormControl(dataItem.UnitPrice),
    UnitsInStock: new FormControl(
      dataItem.UnitsInStock,
      Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{1,2}'),
      ])
    ),
    CategoryID: new FormControl(dataItem.CategoryID),
  });

@Component({
  selector: 'app-cascading-dropdown',
  templateUrl: './cascading-dropdown.component.html',
  styleUrls: ['./cascading-dropdown.component.css'],
  providers: [ProductsService],
})
export class CascadingDropdownComponent implements OnInit {
  @ViewChild('namesDropDown') private namesDdl;
  private editedRowIndex: number;
  public gridData: any[];
  public categories: any[] = categories;
  public names: any[];
  public formGroup: FormGroup;

  constructor(private service: ProductsService) {}

  public ngOnInit(): void {
    this.gridData = this.service.products();
  }

  public category(id: number): any {
    return this.categories.find((x) => x.CategoryID === id);
  }

  public getNames(categoryId: number) {
    this.names = categoryId
      ? this.gridData
          .filter((item) => item.CategoryID === categoryId)
          .map((item) => item.ProductName)
      : this.gridData.map((item) => item.ProductName);
  }

  public onCategoryChange(e) {
    this.getNames(e);
    this.formGroup.controls.ProductName.setValue(undefined);
  }

  public addHandler({ sender }) {
    this.closeEditor(sender);

    this.formGroup = createFormGroup({
      ProductName: '',
      UnitPrice: 0,
      UnitsInStock: '',
      CategoryID: 1,
    });

    sender.addRow(this.formGroup);
  }

  public editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);

    this.getNames(dataItem.CategoryID);

    this.formGroup = createFormGroup(dataItem);

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }): void {
    const product = formGroup.value;

    this.service.save(product, isNew);

    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }): void {
    this.service.remove(dataItem);
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }
}
