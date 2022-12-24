import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventDetailsComponent,
  CreateEventComponent,
  EventRouteActivator,
  EventService,
  EventListResolver,
  SessionListComponent,
  CreateSessionComponent,
  DurationPipe
} from './events/index';
import {  } from './common/toastr.service';
import { Error404Component } from './errors/404.component';
import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/nav-bar.component';
import { appRoutes } from './routes';
import {
   CollapsibleWellComponent,
   SimpleModalComponent,
   ModalTriggerDirective,
   TOASTR_TOKEN,
   Toastr,
   JQ_TOKEN
 } from './common/index';

declare let toastr: any;
declare let jQuery:any;
@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    CreateEventComponent,
    CreateSessionComponent,
    SessionListComponent,
    Error404Component,
    NavBarComponent,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    EventService,
    {provide:TOASTR_TOKEN,useValue:toastr},
    {provide:JQ_TOKEN,useValue:jQuery},
    EventRouteActivator,
    { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState },
    EventListResolver
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component: CreateEventComponent) :boolean{
  if (component.isDirty) {
     return window.confirm('You have not saved this event, do you really want to cancel?');
  }
  return true;
}
