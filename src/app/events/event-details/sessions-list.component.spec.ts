import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { CollapsibleWellComponent } from "src/app/common";
import { AuthService } from "src/app/user/auth.service";
import { DurationPipe, ISession } from "../shared";
import { SessionListComponent } from "./session-list.component";
import { UpvoteComponent } from "./upvote.component";
import { VoterService } from "./voter.service";

describe('Sessions list Component', () => {
  let component: SessionListComponent;
  let mockAuthService: any, mockVoterService: any;

  beforeEach(() => {
    component = new SessionListComponent(mockAuthService, mockVoterService);
  })

  describe('ngOnChanges Event', () => {
    it('should filter the sessions correctly', () => {
      component.sessions = <ISession[]>[
        { name: 'session 1', level: 'intermediate' },
        { name: 'session 2', level: 'intermediate' },
        { name: 'session 3', level: 'beginner' }
      ];
      component.filterBy = 'intermediate';
      component.sortBy = 'name';
      component.eventId = 3;

      component.ngOnChanges();

      expect(component.visibleSessions.length).toBe(2);
    });

    it('should sort the sessions correctly', () => {
      component.sessions = <ISession[]>[
        { name: 'session 1', level: 'intermediate' },
        { name: 'session 3', level: 'intermediate' },
        { name: 'session 2', level: 'beginner' }
      ];
      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 3;

      component.ngOnChanges();

      expect(component.visibleSessions[2].name).toBe('session 3');
    });

  });
});

describe('Sessions list Component - intergrated tests', () => {
  let mockAuthService: any,
    mockVoterService: any,
    fixture: ComponentFixture<SessionListComponent>,
    component: SessionListComponent,
    element: HTMLElement,
    debugEl: DebugElement;

  beforeEach(() => {
    mockAuthService = { isAuthenticated: () => true, currentUser: { userName: 'Joe' } };
    mockVoterService = { userHasVoted: () => true };
    TestBed.configureTestingModule({
      declarations: [
        SessionListComponent,
        DurationPipe,
        UpvoteComponent,
        CollapsibleWellComponent
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: VoterService, useValue: mockVoterService }
      ]
    });
    fixture = TestBed.createComponent(SessionListComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    element = fixture.nativeElement;
  });

  describe('intial display', () => {
    it('should have the correct title', () => {
      component.sessions = [{
        name: 'Session 1',
        id: 3,
        presenter: 'Joe',
        duration: 1,
        level: 'beginner',
        abstract: 'abstract',
        voters: ['john', 'bob']
      }];
      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 4;
      component.ngOnChanges();

      fixture.detectChanges();

      expect(element.querySelector('[well-title]')?.textContent).toContain('Session 1');
      expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent).toContain('Session 1');
    });
  });

});
