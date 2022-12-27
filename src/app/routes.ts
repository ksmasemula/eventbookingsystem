import { Routes } from "@angular/router";
import { Error404Component } from "./errors/404.component";
import { CreateSessionComponent } from "./events/event-details/create-session.component";
import {
  EventsListComponent,
  EventDetailsComponent,
  CreateEventComponent,
  EventListResolver,
  EventResolver
} from './events/index';


export const appRoutes: Routes = [
  { path: 'event/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },
  { path: 'events', component: EventsListComponent, resolve: { events: EventListResolver } },
  { path: 'events/:id', component: EventDetailsComponent, resolve:{event:EventResolver} },
  { path: 'events/session/new', component: CreateSessionComponent },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/events', pathMatch: 'full' }
]
