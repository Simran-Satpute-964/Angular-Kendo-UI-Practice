import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { KendoGridTutorialComponent } from './kendo-grid-tutorial/kendo-grid-tutorial.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTypesComponent } from './data-types/data-types.component';
import { FormsModule } from '@angular/forms';
import { CategoriesService, ProductsService } from './northwind.service';
import { HttpClientModule } from '@angular/common/http';
import { RemoteBindingComponent } from './remote-binding/remote-binding.component';
import { ProductsBindingDirective } from './remote-binding/products-binding.directive';

@NgModule({
  declarations: [
    AppComponent,
    KendoGridTutorialComponent,
    DataTypesComponent,
    RemoteBindingComponent,
    ProductsBindingDirective,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    GridModule,
  ],
  providers: [CategoriesService, ProductsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
