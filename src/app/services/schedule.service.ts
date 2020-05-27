import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Doctor} from "../classes/doctor";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private static readonly URL: string = 'Schedules/';

  constructor(private httpClient: HttpClient) {
  }

  getSchdedulesList(doctor: Doctor, mouth: number, year: number): Promise<string[]> {
    return this.httpClient.get<string[]>(environment.apiUrl + ScheduleService.URL + doctor.id + '/' + mouth + '/' + year).toPromise();
  }
}
