import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Doctor} from "../classes/doctor";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private static readonly URL: string = 'Doctors';

  constructor(private httpClient: HttpClient) {
  }

  getDoctorsList(): Promise<Doctor[]> {
    return this.httpClient.get<Doctor[]>(environment.apiUrl + DoctorService.URL).toPromise();
  }
}
