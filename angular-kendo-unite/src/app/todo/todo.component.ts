import {
  animateChild,
  group,
  query,
  stagger,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fadeIn, fadeOut, moveDown, slideIn, slideOut } from '../animations';
import { HourPipe } from '../hour.pipe';
import { groupBy, GroupResult } from '@progress/kendo-data-query';

interface Todo {
  item: string;
  due: Date;
  hour: number;
}

@Component({
  selector: 'app-todo',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [useAnimation(fadeIn)]),
      transition(':leave', [useAnimation(fadeOut)]),
    ]),
    trigger('todoAnimations', [
      transition(':enter', [
        group([
          query('h1', [useAnimation(moveDown)]),
          query('input', [useAnimation(moveDown)]),
          query('@todoItem', [stagger(100, animateChild())]),
        ]),
      ]),
      transition(':leave', [useAnimation(slideOut)]),
    ]),
    trigger('todoItem', [
      transition(':enter', [useAnimation(slideIn)]),
      transition(':leave', [useAnimation(slideOut)]),
    ]),
  ],
})
export class TodoComponent implements OnInit {
  public initDueTime: Date = new Date(2019, 3, 10, 10, 30, 0);
  public hourlyTodos: Todo[] | GroupResult[] | any[] = [];

  field = 'hour';
  todos: Todo[] = [
    {
      item: 'Take dog to vet',
      due: new Date(2019, 3, 10, 2, 30, 0),
      hour: this.hour.transform(new Date(2019, 3, 10, 2, 30, 0)),
    },
    {
      item: 'Get oil change',
      due: new Date(2019, 3, 10, 2, 30, 0),
      hour: this.hour.transform(new Date(2019, 3, 10, 2, 30, 0)),
    },
    {
      item: 'Finish super hard work',
      due: new Date(2019, 3, 10, 2, 30, 0),
      hour: this.hour.transform(new Date(2019, 3, 10, 2, 30, 0)),
    },
    {
      item: 'Pack for Denver',
      due: new Date(2019, 3, 10, 3, 30, 0),
      hour: this.hour.transform(new Date(2019, 3, 10, 3, 30, 0)),
    },
    {
      item: 'Create to-do app',
      due: new Date(2019, 3, 10, 10, 30, 0),
      hour: this.hour.transform(new Date(2019, 3, 10, 10, 30, 0)),
    },
  ];

  constructor(private hour: HourPipe) {
    this.organizeTodosByHour(this.todos);
  }

  ngOnInit(): void {}

  organizeTodosByHour(todos) {
    if (!todos) return null;
    this.hourlyTodos = groupBy(this.todos, [{ field: this.field }]);

    // Humanizing the category field!!
    for (let group of this.hourlyTodos) {
      // turn the todos into 12 hr clock, not 24
      let hour: number = 12;
      if (group.value % 12 != 0) {
        hour = group.value % 12;
      }
      // add AM or PM to the todos for the chart view
      if (group.value < 12) {
        group.humanizedValue = `${hour} AM`;
      } else {
        group.humanizedValue = `${hour} PM`;
      }
    }

    // Sort the hourlyTodos in order by hour
    this.hourlyTodos.sort((a, b) => {
      if (a.value < b.value) {
        return -1;
      } else if (a.value > b.value) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  public onTimeChange() {
    this.todos.map((todo) => {
      todo.hour = this.hour.transform(todo.due);
      return todo;
    });

    this.organizeTodosByHour(this.todos);
  }

  addToDo(input: HTMLInputElement) {
    this.todos = [
      {
        item: input.value,
        due: this.initDueTime,
        hour: this.hour.transform(this.initDueTime),
      },
      ...this.todos,
    ];
    input.value = '';
    this.organizeTodosByHour(this.todos);
  }

  removeToDo(i) {
    this.todos.splice(i, 1);
    this.organizeTodosByHour(this.todos);
  }
}
