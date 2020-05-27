import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Doctor} from "../classes/doctor";

@Injectable({
  providedIn: 'root'
})
export class DoctorSelectedService {

  private subject = new Subject<Doctor>();

  sendDoctor(doctor: Doctor) {
    this.subject.next(doctor);
  }

  clear() {
    this.subject.next();
  }

  getDoctor(): Observable<Doctor> {
    return this.subject.asObservable();
  }

}
