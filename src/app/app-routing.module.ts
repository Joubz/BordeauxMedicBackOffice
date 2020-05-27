import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CalendarComponent} from "./components/calendar/calendar.component";
import {AppointmentFormComponent} from "./components/appointment-form/appointment-form.component";


const routes: Routes = [
  {path: '', component: CalendarComponent},
  {path: 'form', component: AppointmentFormComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
