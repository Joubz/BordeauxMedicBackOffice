import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Stepper from "bs-stepper";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Patient} from "../../classes/patient";
import {Gender} from "../../enum/gender";

@Component({
  selector: 'app-patient-sub-form',
  templateUrl: './patient-sub-form.component.html',
  styleUrls: ['./patient-sub-form.component.sass']
})
export class PatientSubFormComponent implements OnInit {

  genderEnum = Gender;
  selectedGender: Gender;

  patientForm = new FormGroup({
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern("^[A-Za-zÀ-ÖØ-öø-ÿ\\-]*$") // Chaine de caractères et accents et tiret (-)
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern("^[A-Za-zÀ-ÖØ-öø-ÿ\\-]*$")
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]{10}$") //Que des nombres et uniquement 10 chiffres
    ]),
    email: new FormControl('', [
      Validators.required,
      // Validators.email, // NE PAS UTILISER CAR NE PREND PAS EN COMPTE .FR/.COM OUT TOUTES AUTRES EXTENSIONS
      Validators.pattern("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$")
    ]),
    dateOfBirth: new FormControl('', [
      Validators.required
    ]),
    gender: new FormControl('', [
      Validators.required,
      Validators.pattern("M|F")
    ]),
    height: new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]{2,3}$") // Que des nombres et au moins 2 chiffres et au plus 3 chiffres
    ]),
    weight: new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]{2,3}$") // Que des nombres et au moins 2 chiffres et au plus 3 chiffres
    ]),
  });

  @Input() stepper: Stepper;

  @Output() patientChange: EventEmitter<Patient> = new EventEmitter<Patient>();

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.patientForm.valid) {
      this.patientChange.emit(new Patient(this.patientForm.value))
    }
  }

}
