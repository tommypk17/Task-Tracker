import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBlockComponent } from './task-block.component';

describe('TaskBlockComponent', () => {
  let component: TaskBlockComponent;
  let fixture: ComponentFixture<TaskBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
