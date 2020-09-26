import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveTaskDialogComponent } from './move-task-dialog.component';

describe('MoveTaskDialogComponent', () => {
  let component: MoveTaskDialogComponent;
  let fixture: ComponentFixture<MoveTaskDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveTaskDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
