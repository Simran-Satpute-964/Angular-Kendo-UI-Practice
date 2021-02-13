import { Component, OnInit } from '@angular/core';
import {
  filterBy,
  CompositeFilterDescriptor,
} from '@progress/kendo-data-query';
import { sampleProducts } from '../products';

const flatten = (filter) => {
  const filters = filter.filters;
  if (filters) {
    return filters.reduce(
      (acc, curr) => acc.concat(curr.filters ? flatten(curr) : [curr]),
      []
    );
  }
  return [];
};

@Component({
  selector: 'app-custom-filter',
  templateUrl: './custom-filter.component.html',
  styleUrls: ['./custom-filter.component.css'],
})
export class CustomFilterComponent {
  public checked = false;
  public filter: CompositeFilterDescriptor = {
    logic: 'and',
    filters: [
      {
        field: 'Discontinued',
        operator: 'eq',
        value: this.checked,
      },
    ],
  };
  public gridData: any[] = filterBy(sampleProducts, this.filter);

  public filterChange(filter: CompositeFilterDescriptor): void {
    this.filter = filter;
    this.gridData = filterBy(sampleProducts, {
      logic: 'and',
      filters: [],
      ...this.filter,
    });
  }

  public switchChange(checked: boolean): void {
    const root = { logic: 'and', filters: [], ...this.filter };

    // here filter contains 1st element of array
    const [filter] = flatten(root).filter((x) => x.field === 'Discontinued');
    // f2 can contain multiple elements
    // const f2 = flatten(root).filter((x) => x.field === 'Discontinued');

    if (!filter) {
      root.filters.push({
        field: 'Discontinued',
        operator: 'eq',
        value: checked,
      });
    } else {
      filter.value = checked;
    }
    this.checked = checked;
    this.filterChange(root);
  }
}
