import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Appointment} from "../classes/appointment";
import {Observable} from "rxjs";
import {Doctor} from "../classes/doctor";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private static readonly URL: string = 'Appointments';

  private headers: HttpHeaders = new HttpHeaders();

  constructor(private httpClient: HttpClient) {
  }

  createAppointment(appointment: Appointment): Promise<any> {
    this.headers.append("Content-Type", "application/json");
    this.headers.append('Access-Control-Allow-Origin', '*');

    return this.httpClient.post(environment.apiUrl + AppointmentService.URL, appointment, {headers: this.headers}).toPromise();
  }

  getAll(): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(environment.apiUrl + AppointmentService.URL);
  }

  getAppointments(doctor: Doctor, month: number, year: number): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(environment.apiUrl + AppointmentService.URL + '/' + doctor.id + '/' + month + '/' + year);
  }


  deleteAppointment(appointment: Appointment): Observable<any> {
    this.headers.append("Content-Type", "application/json");
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append("Access-Control-Allow-Credentials", "true");
    this.headers.append("Access-Control-Allow-Headers", "origin, content-type, accept, authorization");
    this.headers.append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
    this.headers.append("Accept", "*/*");

    return this.httpClient.delete(environment.apiUrl + AppointmentService.URL + '/' + appointment.id, {headers: this.headers});
  }

}
