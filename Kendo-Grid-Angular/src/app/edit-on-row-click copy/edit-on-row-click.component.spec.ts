import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOnRowClickComponent } from './edit-on-row-click.component';

describe('EditOnRowClickComponent', () => {
  let component: EditOnRowClickComponent;
  let fixture: ComponentFixture<EditOnRowClickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOnRowClickComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOnRowClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
