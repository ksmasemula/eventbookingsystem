import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/user/auth.service';
import { ISession } from '../shared';
import { VoterService } from './voter.service';

@Component({
  selector: 'session-list',
  templateUrl: 'session-list.component.html'
})

export class SessionListComponent implements OnChanges {
  @Input() eventId!:number;
  @Input() sessions!: ISession[];
  @Input() filterBy!: string;
  @Input() sortBy!: string;
  visibleSessions: ISession[] = [];

  constructor(
    public auth: AuthService,
    private voterService: VoterService
  ) { }

  ngOnChanges(): void {
    if (this.sessions)
      this.filterBySessions(this.filterBy);
    this.sortBy === 'name' ? this.visibleSessions.sort(sortByNameAsc) : this.visibleSessions.sort(sortByVotesDesc);
  }

  toggleVote(session: ISession) {
    if (this.userHasVoted(session)) {
      this.voterService.deleteVoter(this.eventId,session, this.auth.currentUser.userName)
    } else {
      this.voterService.addVoter(this.eventId,session, this.auth.currentUser.userName)
    }

    if (this.sortBy === 'vote')
      this.visibleSessions.sort(sortByVotesDesc);
  }

  userHasVoted(session: ISession): boolean {
    return this.voterService.userHasVoted(session, this.auth.currentUser.userName);
  }

  filterBySessions(filter: string) {
    if (filter === 'all') {
      this.visibleSessions = this.sessions.slice(0);
    } else {
      this.visibleSessions = this.sessions.filter(session => session.level.toLocaleLowerCase() === filter)
    }
  }
}

function sortByNameAsc(s1: ISession, s2: ISession) {
  if (s1.name > s2.name) return 1
  else if (s1.name === s2.name) return 0
  else return -1
}

function sortByVotesDesc(s1: ISession, s2: ISession) {
  return s2.voters.length - s1.voters.length
}


