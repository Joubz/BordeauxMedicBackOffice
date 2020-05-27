import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from "angular-calendar";
import {addMinutes, isSameDay, isSameMonth} from "date-fns";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DAYS_OF_WEEK} from "calendar-utils";
import {AppointmentService} from "../../services/appointment.service";
import {Appointment} from "../../classes/appointment";
import {TitleCasePipe} from "@angular/common";
import {DoctorSelectedService} from "../../services/doctor-selected.service";
import {Doctor} from "../../classes/doctor";


@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.sass']
})
export class CalendarViewComponent implements OnInit {

  /**
   * Référence templétique du DOM pour accéder au modal
   */
  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;
  /**
   * Tableau des événéments au format des modules internes du calendrier
   */
  events: CalendarEvent[] = [];
  private appointments: Appointment[] = [];
  /**
   * Actions disponnibles et binding de ces dernières via un label
   */
  actions: CalendarEventAction[] = [
    /*{
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit'
      onClick: ({event}: { event: CalendarEvent }): void => {
        // TODO Faire la modif à l'uptade
        // this.handleEvent('Edited', event);
      },
    },*/
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.appointmentService.deleteAppointment(this.appointments.find(value => value.id === event.id)).subscribe(
          (value => this.events = this.events.filter((iEvent) => iEvent !== event)),
          (reason => {
            console.log(reason);
            alert("Une erreur s'est produite. Impossible de supprimer le rendez-vous.");
          })
        );
      },
    },
  ];
  /**
   * Le jour par lequel le calendrier commence lorsqu'il est sous la forme mensuelle.
   * @see DAYS_OF_WEEK
   */
  private weekStartsOn = DAYS_OF_WEEK.MONDAY
  /**
   * Propriété permettant d'utiliser l'enum `CalendarView` au sein du HTML
   * @see CalendarView
   */
  private CalendarView = CalendarView;
  /**
   * Indique si la liste des rendez-vous est automatique ouverte pour aujourd'hui lorsque le calendrier est sous la
   * forme mensuelle.
   */
  private activeDayIsOpen: boolean;
  /**
   * Propriété indiquant la langue utilisée pour afficher les jours de la semaine.
   * Cette propriété est exportée vers le composant `mlw-calendar-month-view` afin d'afficher les jours de la semaine
   * en français.
   */
  private locale: String = 'fr';
  /**
   * Propriété indiquant les jours de la semaine à exclure.
   */
  private excludeDays = [0]

  private refresh: Subject<any> = new Subject();
  private modalData: {
    action: string;
    event: CalendarEvent;
  };
  private subscription: Subscription;

  constructor(private modal: NgbModal,
              private appointmentService: AppointmentService,
              private doctorSelectedService: DoctorSelectedService) {
    this.subscription = this.doctorSelectedService.getDoctor().subscribe(doctor => {
      if (doctor) {
        console.log(doctor)
        this.loadAppointments(doctor);
      }
      ;
    });
  }

  /**
   * Indique la forme du calendrier à afficher. La forme peut-être modifiée par l'utilisateur.
   * @see CalendarHeaderComponent
   */
  private _view: CalendarView;

  @Input()
  set view(view: CalendarView) {
    if (view) {
      console.log(view)
      this._view = view
    }
  }

  /**
   * La date du jour
   */
  private _viewDate: Date;

  @Input()
  set viewDate(date: Date) {
    console.log(date)
    if (date) {
      this._viewDate = date
    }
  }

  @Input()
  set i_activeDayIsOpen(isOpen: boolean) {
    console.log("okkkkkk")
    console.log(isOpen)
    if (isOpen) {
      this.activeDayIsOpen = isOpen
    }
  }

  /**
   * Permet d'afficher les rendez-vous pour la journée sélectionnée
   * @param date
   * @param events
   */
  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this._viewDate)) {
      if (
        (isSameDay(this._viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this._viewDate = date;
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {event, action};
    this.modal.open(this.modalContent, {size: 'lg'});
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private loadAppointments(doctor: Doctor) {
    this.appointmentService.getAppointments(doctor, this._viewDate.getMonth(), this._viewDate.getFullYear()).subscribe(
      value => this.appointments = value,
      reason => console.log(reason),
      () => {
        const events: CalendarEvent[] = [];

        this.appointments.forEach(value => {
          const splitedDate = value.date.split('-');
          const splitedTime = value.time.split(':');
          const date = new Date(Number(splitedDate[0]), Number(splitedDate[1]), Number(splitedDate[2]), Number(splitedTime[0]), Number(splitedTime[1]));

          events.push({
            id: value.id,
            start: date,
            end: addMinutes(date, value.doctor.appointmentLast),
            title: value.patient.lastName.toUpperCase() + ' ' + new TitleCasePipe().transform(value.patient.firstName),
            color: {primary: '#1e90ff', secondary: '#D1E8FF'},
            actions: this.actions,
            allDay: false
          });
        });

        this.events = events;
        console.log(this.events);
      }
    );
  }

}
