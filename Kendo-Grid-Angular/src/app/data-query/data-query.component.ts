import { Component, OnInit } from '@angular/core';
import {
  aggregateBy,
  AggregateResult,
  Comparer,
  compileFilter,
  composeSortDescriptors,
  distinct,
  filterBy,
  groupBy,
  orderBy,
  process,
} from '@progress/kendo-data-query';

/*
 * API Documentation :-   https://www.telerik.com/kendo-angular-ui/components/data-query/api/
 */

// *------------------------------ Filter ----------------------------------*
const data = [
  { name: 'Pork', category: 'Food', subcategory: 'Meat' },
  { name: 'Pepper', category: 'Food', subcategory: 'Vegetables' },
  { name: 'Beef', category: 'Food', subcategory: 'Meat' },
];

// logic    :   "and" | "or"
// operator :   https://www.telerik.com/kendo-angular-ui/components/data-query/api/FilterDescriptor/#toc-operator
const filteringResult = filterBy(data, {
  logic: 'and',
  filters: [
    { field: 'name', operator: 'startswith', value: 'p', ignoreCase: true },
    { field: 'subcategory', operator: 'eq', value: 'Meat' },
  ],
});

// *----------------------- Filter Using Predicate --------------------------*
const predicate = compileFilter({
  logic: 'and',
  filters: [
    { field: 'name', operator: 'startswith', value: 'p', ignoreCase: true },
  ],
});

const filterPredicateResult = data.filter(predicate);

// *------------------------------ Sorting ----------------------------------*
const sortingResult = orderBy(data, [{ field: 'name', dir: 'asc' }]);

const groupByResult = groupBy(data, [
  { field: 'category' },
  { field: 'subcategory', dir: 'desc' },
]);

// *------------------- Sorting Using Predicate -----------------------------*

const comparer = composeSortDescriptors([{ field: 'name', dir: 'asc' }]);
const sortPredicateResult = data.sort(comparer);

// *------------------------------ Aggregate --------------------------------*
const data2 = [
  { productName: 'Chai', unitPrice: 18, unitsInStock: 39 },
  { productName: 'Chang', unitPrice: 19, unitsInStock: 17 },
  { productName: 'Aniseed Syrup', unitPrice: 10, unitsInStock: 13 },
];

// "count" | "sum" | "average" | "min" | "max"
// specifying return type <AggregateResult> is optional
const aggregateByResult = <AggregateResult>aggregateBy(data2, [
  { field: 'productName', aggregate: 'count' },
  { field: 'unitPrice', aggregate: 'sum' },
  { field: 'unitPrice', aggregate: 'average' },
  { field: 'unitsInStock', aggregate: 'min' },
  { field: 'unitsInStock', aggregate: 'max' },
]);

// *------------------------------ Distinct ---------------------------------*
const distinctResult = distinct(data, 'subcategory');

// *------------------------------ Process ----------------------------------*
const processData = [
  {
    productName: 'Chai',
    unitPrice: 18,
    unitsInStock: 39,
    discontinued: false,
    category: { categoryName: 'Beverages' },
  },
  {
    productName: 'Chang',
    unitPrice: 19,
    unitsInStock: 17,
    discontinued: false,
    category: { categoryName: 'Beverages' },
  },
  {
    productName: 'Aniseed Syrup',
    unitPrice: 10,
    unitsInStock: 13,
    discontinued: false,
    category: { categoryName: 'Condiments' },
  },
  {
    productName: 'Cajun Seasoning',
    unitPrice: 22,
    unitsInStock: 53,
    discontinued: false,
    category: { categoryName: 'Condiments' },
  },
  {
    productName: 'Gumbo Mix',
    unitPrice: 21.35,
    unitsInStock: 0,
    discontinued: true,
    category: { categoryName: 'Condiments' },
  },
];

// return type  <DataResult>
const processResult = process(processData, {
  group: [
    {
      field: 'category.categoryName',
      aggregates: [
        { aggregate: 'sum', field: 'unitPrice' },
        { aggregate: 'sum', field: 'unitsInStock' },
      ],
    },
  ],
  sort: [{ field: 'productName', dir: 'desc' }],
  filter: {
    logic: 'or',
    filters: [
      { field: 'discontinued', operator: 'eq', value: true },
      { field: 'unitPrice', operator: 'lt', value: 22 },
    ],
  },
});

// *------------------------------ Comparer --------------------------------*
const isGreaterThan: Comparer = (a, b) => (a > b ? 1 : a === b ? 0 : -1);

@Component({
  selector: 'app-data-query',
  templateUrl: './data-query.component.html',
  styleUrls: ['./data-query.component.css'],
})
export class DataQueryComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log(JSON.stringify(filteringResult, null, 2));
    /* output
    [
        { "name": "Pork", "category": "Food", "subcategory": "Meat" }
    ]
    */

    console.log('sortingResult :>> ', sortingResult);

    /* output
   [
     { "name": "Beef", "category": "Food", "subcategory": "Meat" },
     { "name": "Pepper", "category": "Food", "subcategory": "Vegetables" },
     { "name": "Pork", "category": "Food", "subcategory": "Meat" }
   ]
   */

    console.log('groupByResult :>> ', groupByResult);
    console.log('aggregateByResult :>> ', aggregateByResult);
    console.log('filterPredicateResult :>> ', filterPredicateResult);
    console.log('sortPredicateResult :>> ', sortPredicateResult);
    console.log('distinctResult :>> ', distinctResult);
    console.log('processResult :>> ', processResult);
    console.log('isGreaterThan(42, 42) :>> ', isGreaterThan(42, 42)); // 0
    console.log('isGreaterThan(22, 42) :>> ', isGreaterThan(22, 42)); // -1
    console.log('isGreaterThan(42, 22) :>> ', isGreaterThan(42, 22)); // 1
  }
}
