import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Stepper from "bs-stepper";
import {DoctorService} from "../../services/doctor.service";
import {Doctor} from "../../classes/doctor";

@Component({
  selector: 'app-doctor-sub-form',
  templateUrl: './doctor-sub-form.component.html',
  styleUrls: ['./doctor-sub-form.component.sass']
})
export class DoctorSubFormComponent implements OnInit {

  doctors: Doctor[] = []
  selectedDoctor: Doctor;


  @Input()
  stepper: Stepper;

  @Output()
  doctorFormChange: EventEmitter<Doctor> = new EventEmitter<Doctor>()


  constructor(private doctorService: DoctorService) {
  }

  ngOnInit() {
    this.doctorService.getDoctorsList()
      .then(value => this.doctors = value)
      .catch(reason => console.log(reason))
  }


  onSubmit() {
    this.doctorFormChange.emit(this.selectedDoctor);
    this.stepper.next();
  }

}
