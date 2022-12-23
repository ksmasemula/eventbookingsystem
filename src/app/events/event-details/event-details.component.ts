import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISession } from '../shared';
import { EventService } from '../shared/event.service';

@Component({
  templateUrl: './event-details.component.html',
  styles: [`
    .container {padding-left:20px; padding-right: 20px;}
    .event-image {height:100px;},
    a {cursor:pointer;}
  `]
})

export class EventDetailsComponent implements OnInit {


  event: any;
  eventId?: number;
  addMode: boolean = false;
  filterBy: string = 'all';
  sortBy: string = 'vote';
  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.eventId = +this.route.snapshot.params['id'];
    this.event = this.eventService.getEvent(this.eventId);
  }

  addSession() {
    this.addMode = true;
  }

  saveNewSession(session: ISession) {
    session.id = this.event.sessions.length + 1;
    this.event.sessions.push(session);
    this.eventService.updateEvent(this.event);
    this.addMode = false;
  }

  cancelAddNewSession() {
    this.addMode = false;
  }
}
