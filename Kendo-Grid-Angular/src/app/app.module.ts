import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { KendoGridTutorialComponent } from './kendo-grid-tutorial/kendo-grid-tutorial.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTypesComponent } from './data-types/data-types.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesService, ProductsService } from './northwind.service';
import { HttpClientModule } from '@angular/common/http';
import { RemoteBindingComponent } from './remote-binding/remote-binding.component';
import { ProductsBindingDirective } from './remote-binding/products-binding.directive';
import { CascadingDropdownComponent } from './cascading-dropdown/cascading-dropdown.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { EditOnRowClickComponent } from './edit-on-row-click/edit-on-row-click.component';
import { DataQueryComponent } from './data-query/data-query.component';
import { CustomFilterComponent } from './custom-filter/custom-filter.component';
import { InputsModule } from '@progress/kendo-angular-inputs';


@NgModule({
  declarations: [
    AppComponent,
    KendoGridTutorialComponent,
    DataTypesComponent,
    RemoteBindingComponent,
    ProductsBindingDirective,
    CascadingDropdownComponent,
    EditOnRowClickComponent,
    DataQueryComponent,
    CustomFilterComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    GridModule,
    DropDownsModule,
    ReactiveFormsModule,
    InputsModule,
  ],
  providers: [CategoriesService, ProductsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
