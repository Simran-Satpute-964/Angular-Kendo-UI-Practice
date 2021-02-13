import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-other-components',
  templateUrl: './other-components.component.html',
  styleUrls: ['./other-components.component.css'],
})
export class OtherComponentsComponent implements OnInit {
  subject: string = '';
  sub: string = 'Hello';
  constructor() {}

  ngOnInit(): void {}
  setModelChanged() {
    console.log('subject :>> ', this.subject);
    console.log('sub :>> ', this.sub);
  }
}
