import {Component, Input, OnInit} from '@angular/core';
import {CalendarView} from 'angular-calendar';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent implements OnInit {

  private view: CalendarView;
  private CalendarView = CalendarView;
  private viewDate: Date;
  private activeDayIsOpen: boolean;

  constructor() {
  }

  @Input()
  set i_view(view: CalendarView) {
    if (view) {
      this.view = view
    }
  }

  @Input()
  set i_viewDate(date: Date) {
    if (date) {
      this.viewDate = date
    }
  }

  @Input()
  set i_activeDayIsOpen(isOpen: boolean) {
    if (isOpen) {
      this.activeDayIsOpen = isOpen
    }
  }

  ngOnInit() {
  }

  /**
   * Met à jour le type de vue demandée en fonction des trois vues du calendrier (Mois, Semaine, Jour)
   * @param view
   */
  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
