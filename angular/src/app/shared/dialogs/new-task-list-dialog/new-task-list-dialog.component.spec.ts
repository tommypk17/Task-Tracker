import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskListDialogComponent } from './new-task-list-dialog.component';

describe('NewTaskListDialogComponent', () => {
  let component: NewTaskListDialogComponent;
  let fixture: ComponentFixture<NewTaskListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTaskListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTaskListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
