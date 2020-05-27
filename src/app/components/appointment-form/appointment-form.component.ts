import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import Stepper from "bs-stepper";
import {Doctor} from "../../classes/doctor";
import {Schedule} from "../../classes/schedule";
import {Patient} from "../../classes/patient";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AppointmentService} from "../../services/appointment.service";
import {Appointment} from "../../classes/appointment";

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.sass']
})
export class AppointmentFormComponent implements OnInit {
  @ViewChild('modalContent', {static: true})
  modalContent: TemplateRef<any>;

  private stepper: Stepper;

  /*private appointmentForm = new FormGroup({
    doctorForm: new FormGroup({
      doctorId: new FormControl('')
    }),
    schedule: new FormGroup({
      scheduleId: new FormControl(''),
      scheduleDate: new FormControl(''),
      scheduleHour: new FormControl('')
    }),
    patient:  new FormGroup({
      lastName: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfBirth: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      height: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required]),
    })
  });*/

  private doctor: Doctor;
  private schedule: Schedule;
  private patient: Patient;

  constructor(private modalService: NgbModal,
              private appointmentService: AppointmentService) {
  }

  ngOnInit() {
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: true,
      animation: true
    });
  }

  onPrevious() {
    this.stepper.previous();
  }

  onNext() {
    this.stepper.next();
  }

  onSubmit() {
    return false;
  }

  onDoctorFormChange(doctor: Doctor) {
    this.doctor = doctor;
    console.log(this.doctor);
  }

  onScheduleFormChange(schedule: Schedule) {
    this.schedule = schedule;
    console.log(this.schedule);
  }

  onPatientFormChange(patient: Patient) {
    this.patient = patient;
    console.log(this.patient);

    this.completeForm();
  }

  private completeForm() {
    if (this.doctor && this.schedule && this.patient) {
      this.modalService.open(this.modalContent, {centered: true});

    }
  }

  private onConfirm() {
    const appointment: Appointment = new Appointment();
    appointment.doctor = this.doctor;
    appointment.patient = this.patient;
    appointment.date = this.schedule.unformated.substr(0, 10);
    appointment.time = this.schedule.time;

    console.log(appointment);

    this.appointmentService.createAppointment(appointment)
      .then(value => {
        if (value) {
          this.modalService.dismissAll();
          window.location.reload();
        } else {
          alert("Une erreur s'est produite. Merci de recommencer");
          this.modalService.dismissAll();
          this.stepper.to(0);
        }
      })
  }


}
