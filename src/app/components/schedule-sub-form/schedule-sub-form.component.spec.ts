import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ScheduleSubFormComponent} from './schedule-sub-form.component';

describe('ScheduleSubFormComponent', () => {
  let component: ScheduleSubFormComponent;
  let fixture: ComponentFixture<ScheduleSubFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleSubFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleSubFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
