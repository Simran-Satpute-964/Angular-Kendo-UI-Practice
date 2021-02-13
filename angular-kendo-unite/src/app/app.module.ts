import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonControlPanelComponent } from './button-control-panel/button-control-panel.component';
import { TodoComponent } from './todo/todo.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { HourPipe } from './hour.pipe';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';
import { KendoGridComponent } from './kendo-grid/kendo-grid.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { OtherComponentsComponent } from './other-components/other-components.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ButtonControlPanelComponent,
    TodoComponent,
    HourPipe,
    KendoGridComponent,
    OtherComponentsComponent,
  ],
  imports: [
    BrowserModule,
    ButtonsModule,
    BrowserAnimationsModule,
    InputsModule,
    DateInputsModule,
    ChartsModule,
    GridModule,
    FormsModule,
  ],
  providers: [HourPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
