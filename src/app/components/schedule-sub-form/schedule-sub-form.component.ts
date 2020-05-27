import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Stepper from "bs-stepper";
import {ScheduleService} from "../../services/schedule.service";
import {Doctor} from "../../classes/doctor";
import {Schedule} from "../../classes/schedule";

@Component({
  selector: 'app-schedule-sub-form',
  templateUrl: './schedule-sub-form.component.html',
  styleUrls: ['./schedule-sub-form.component.sass']
})
export class ScheduleSubFormComponent implements OnInit {

  schedules: Schedule[] = [];
  selectedSchedule: Schedule;


  @Input()
  stepper: Stepper;
  @Output()
  scheduleChange: EventEmitter<Schedule> = new EventEmitter<Schedule>();

  constructor(private scheduleService: ScheduleService) {
  }

  @Input()
  set doctor(doc: Doctor) {
    if (doc !== undefined) {
      this.consumeSchedules(doc);
    }
  }

  ngOnInit() {
  }


  onScheduleChange(scheduleId: any) {
    this.selectedSchedule = this.schedules.find(value => value.unformated === scheduleId);
    if (this.selectedSchedule) {
      this.scheduleChange.emit(this.selectedSchedule);
    } else {
      alert('Une erreur s\'est produite. Merci de sélectionner un autre horaire !');
    }
  }

  private consumeSchedules(doctor: Doctor) {
    const now = new Date();
    this.scheduleService.getSchdedulesList(doctor, now.getMonth(), now.getFullYear())
      .then(value => value.forEach(data => {
        const str = data.split('T');
        this.schedules.push(new Schedule(new Date(str[0]), str[1], data));
      }))
      .catch(reason => console.log(reason));
  }

}
