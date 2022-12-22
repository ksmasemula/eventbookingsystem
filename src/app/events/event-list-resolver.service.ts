import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { EventService } from "./shared/event.service";
import { map } from 'rxjs/operators';
import { IEvent } from "./shared";

@Injectable()

export class EventListResolver implements Resolve<IEvent[]>{
  constructor(
    private eventService: EventService
  ) { }
  resolve() :IEvent[]{
    return this.eventService.getEvents();
  }
}
