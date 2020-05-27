import {Doctor} from "./doctor";
import {Patient} from "./patient";

export class Appointment {
  readonly id: number;
  doctor: Doctor;
  patient: Patient;
  date: string;
  time: string;
}
