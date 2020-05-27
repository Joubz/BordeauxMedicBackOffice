import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CalendarComponent} from './components/calendar/calendar.component';
import {CalendarHeaderComponent} from './components/calendar-header/calendar-header.component';
import localeFr from '@angular/common/locales/fr';
import {registerLocaleData} from "@angular/common";
import {CalendarViewComponent} from './components/calendar-view/calendar-view.component';
import {HttpClientModule} from "@angular/common/http";
import {AppointmentFormComponent} from './components/appointment-form/appointment-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DoctorSubFormComponent} from './components/doctor-sub-form/doctor-sub-form.component';
import {ScheduleSubFormComponent} from './components/schedule-sub-form/schedule-sub-form.component';
import {SelectableTableDirective} from './directives/selectable-table.directive';
import {PatientSubFormComponent} from './components/patient-sub-form/patient-sub-form.component';
import {SortByPipe} from './pipes/sort-by.pipe';
import {GenderTextPipe} from './pipes/gender-text.pipe';
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CalendarHeaderComponent,
    CalendarViewComponent,
    AppointmentFormComponent,
    DoctorSubFormComponent,
    ScheduleSubFormComponent,
    SelectableTableDirective,
    PatientSubFormComponent,
    SortByPipe,
    GenderTextPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
