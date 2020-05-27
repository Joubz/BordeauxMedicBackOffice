import {Component, OnInit} from '@angular/core';
import {CalendarView} from "angular-calendar";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit {

  private view: CalendarView = CalendarView.Month;
  private viewDate: Date = new Date();
  private activeDayIsOpen: boolean = true;

  constructor() {
  }

  ngOnInit() {
  }

  onViewDateChange(viewDate: Date) {
    this.viewDate = viewDate;
  }

  onActiveDayIsOpenChange(isOpen: boolean) {
    this.activeDayIsOpen = isOpen;
  }

}
