import { Component, OnInit } from '@angular/core';
import { EventService, ISession ,IEvent} from '../events';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styles: [`
    .nav.navbar-nav {font-size: 15px;}
    #searchForm {margin-right: 100px;}
    @media (max-width:1200px) {#searchForm {display:none;}}
    li > a.active { color:#F97924;}
  `]
})

export class NavBarComponent implements OnInit {

  searchTerm: string = '';
  foundSessions!: any[];
  events:any = [];
  constructor(
    public authService: AuthService,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.getEventList();
  }

  getEventList(){
    this.eventService.getEvents().subscribe(event =>{
      this.events = event.map(event=> {
        return {
          id:event.id,
          name:event.name
        }
      });
    });
  }
  searchSession(term: string) {
    this.eventService.searchSessions(term).subscribe(sessions => {
      this.foundSessions = sessions;
    });
  }
}
