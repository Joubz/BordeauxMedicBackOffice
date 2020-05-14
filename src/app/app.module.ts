import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CalendarComponent} from './components/calendar/calendar.component';
import {CalendarHeaderComponent} from './components/calendar-header/calendar-header.component';
import localeFr from '@angular/common/locales/fr';
import {registerLocaleData} from "@angular/common";
import {CalendarViewComponent} from './components/calendar-view/calendar-view.component';

export function momentAdapterFactory() {
  return adapterFactory(moment);
};

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CalendarHeaderComponent,
    CalendarViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CalendarModule.forRoot({provide: DateAdapter, useFactory: momentAdapterFactory}),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
