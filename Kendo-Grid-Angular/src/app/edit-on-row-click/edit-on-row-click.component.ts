import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from './products.service';
import {
  AddEvent,
  EditEvent,
  GridComponent,
} from '@progress/kendo-angular-grid';
import { groupBy, GroupDescriptor } from '@progress/kendo-data-query';

const createFormGroup = (dataItem) =>
  new FormGroup({
    Discontinued: new FormControl(dataItem.Discontinued),
    ProductID: new FormControl(dataItem.ProductID),
    ProductName: new FormControl(dataItem.ProductName, Validators.required),
    UnitPrice: new FormControl(dataItem.UnitPrice),
    UnitsInStock: new FormControl(
      dataItem.UnitsInStock,
      Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{1,3}'),
      ])
    ),
  });

const matches = (el, selector) =>
  (el.matches || el.msMatchesSelector).call(el, selector);

@Component({
  selector: 'app-edit-on-row-click',
  templateUrl: './edit-on-row-click.component.html',
  styleUrls: ['./edit-on-row-click.component.css'],
  providers: [ProductsService],
})
export class EditOnRowClickComponent implements OnInit, OnDestroy {
  @ViewChild(GridComponent)
  private grid: GridComponent;

  public groups: GroupDescriptor[] = [];
  public view: any[];

  public formGroup: FormGroup;

  private editedRowIndex: number;
  private docClickSubscription: any;
  private isNew: boolean;

  constructor(private service: ProductsService, private renderer: Renderer2) {}

  public ngOnInit(): void {
    this.view = this.service.products();

    this.docClickSubscription = this.renderer.listen(
      'document',
      'click',
      this.onDocumentClick.bind(this)
    );
  }

  public ngOnDestroy(): void {
    this.docClickSubscription();
  }

  public addHandler(): void {
    this.closeEditor();

    this.formGroup = createFormGroup({
      Discontinued: false,
      ProductName: '',
      UnitPrice: 0,
      UnitsInStock: '',
    });
    this.isNew = true;

    this.grid.addRow(this.formGroup);
  }

  public cellClickHandler({ isEdited, dataItem, rowIndex }): void {
    if (isEdited || (this.formGroup && !this.formGroup.valid)) {
      return;
    }

    if (this.isNew) {
      rowIndex += 1;
    }

    this.saveCurrent();

    this.formGroup = createFormGroup(dataItem);
    this.editedRowIndex = rowIndex;

    this.grid.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler(): void {
    this.closeEditor();
  }

  public groupChange(groups: GroupDescriptor[]): void {
    this.groups = groups;
    this.view = groupBy(this.service.products(), this.groups);
  }

  private closeEditor(): void {
    this.grid.closeRow(this.editedRowIndex);

    this.isNew = false;
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

  private onDocumentClick(e: any): void {
    if (
      this.formGroup &&
      this.formGroup.valid &&
      !matches(
        e.target,
        '#productsGrid tbody *, #productsGrid .k-grid-toolbar .k-button'
      )
    ) {
      this.saveCurrent();
    }
  }

  private saveCurrent(): void {
    if (this.formGroup) {
      this.service.save(this.formGroup.value, this.isNew);
      this.closeEditor();
    }
  }
}
