import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {CalendarView} from 'angular-calendar';
import {DoctorService} from "../../services/doctor.service";
import {Doctor} from "../../classes/doctor";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DoctorSelectedService} from "../../services/doctor-selected.service";

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.sass']
})
export class CalendarHeaderComponent implements OnInit {

  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;

  private CalendarView = CalendarView;
  private doctors: Doctor[] = [];
  private selectedDoctor: Doctor;

  @Input() view: CalendarView;
  @Input() viewDate: Date;
  @Input() activeDayIsOpen: boolean;

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() viewChange: EventEmitter<CalendarView> = new EventEmitter<CalendarView>();
  @Output() activeDayIsOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private _doctorService: DoctorService,
              private modal: NgbModal,
              private doctorSelectedService: DoctorSelectedService) {
  }

  ngOnInit() {
    this._doctorService.getDoctorsList()
      .then(value => this.doctors = value)
      .catch((reason) => console.log(reason));
  }


  /**
   * Met à jour le type de vue demandée en fonction des trois vues du calendrier (Mois, Semaine, Jour)
   * @param view
   */
  setView(view: CalendarView) {
    this.view = view;
    this.viewChange.emit(this.view);
  }

  onViewDateChange(viewDate: Date) {
    this.viewDateChange.emit(viewDate);

    this.activeDayIsOpen = false;
    this.activeDayIsOpenChange.emit(this.activeDayIsOpen);
  }

  onSelectDoctorChange(doctor: Doctor) {
    this.doctorSelectedService.sendDoctor(this.selectedDoctor);
  }

  onSelect() {
    console.log("select");
    this.doctorSelectedService.sendDoctor(this.selectedDoctor);
  }
}
