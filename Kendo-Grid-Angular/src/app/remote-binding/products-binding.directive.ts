import { Directive, OnInit, OnDestroy } from '@angular/core';
import {
  DataBindingDirective,
  GridComponent,
} from '@progress/kendo-angular-grid';
import { ProductsService } from '../northwind.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[productsBinding]',
})
export class ProductsBindingDirective
  extends DataBindingDirective
  implements OnInit, OnDestroy {
  private serviceSubscription: Subscription;

  constructor(private products: ProductsService, grid: GridComponent) {
    super(grid);
  }

  public ngOnInit(): void {
    this.serviceSubscription = this.products.subscribe((result) => {
      this.grid.loading = false;
      this.grid.data = result;
      this.notifyDataChange();
    });

    super.ngOnInit();

    this.rebind();
  }

  public ngOnDestroy(): void {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }

    super.ngOnDestroy();
  }

  public rebind(): void {
    this.grid.loading = true;

    this.products.query(this.state);
  }
}
