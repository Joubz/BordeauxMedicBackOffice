import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DoctorSubFormComponent} from './doctor-sub-form.component';

describe('DoctorSubFormComponent', () => {
  let component: DoctorSubFormComponent;
  let fixture: ComponentFixture<DoctorSubFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorSubFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorSubFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
