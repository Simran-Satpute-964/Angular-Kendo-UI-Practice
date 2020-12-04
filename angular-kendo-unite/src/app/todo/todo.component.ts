import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todos = [
    {
      item: 'Take dog to vet',
    },
    {
      item: 'Get oil change',
    },
    {
      item: 'Finish super hard work',
    },
    {
      item: 'Pack for Denver',
    },
    {
      item: 'Create to-do app',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  addToDo(input: HTMLInputElement) {
    this.todos = [
      {
        item: input.value,
      },
      ...this.todos,
    ];
    input.value = '';
  }

  removeToDo(todo, i) {
    this.todos.splice(i, 1);
  }
}
