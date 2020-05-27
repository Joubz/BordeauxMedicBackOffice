import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PatientSubFormComponent} from './patient-sub-form.component';

describe('PatientSubFormComponent', () => {
  let component: PatientSubFormComponent;
  let fixture: ComponentFixture<PatientSubFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PatientSubFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientSubFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
