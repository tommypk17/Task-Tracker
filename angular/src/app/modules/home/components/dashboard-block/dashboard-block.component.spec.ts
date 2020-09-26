import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBlockComponent } from './dashboard-block.component';

describe('DashboardBlockComponent', () => {
  let component: DashboardBlockComponent;
  let fixture: ComponentFixture<DashboardBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
