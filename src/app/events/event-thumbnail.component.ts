import { style } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { ToastrService } from '../common/toastr.service';
import { IEvent } from './shared';

@Component({
  selector: 'event-thumbnail',
  template: `
    <div class="well hoverwell thumbnail" [routerLink]="['/events',event?.id]">
      <h2>{{event?.name}}</h2>
      <div>Date: {{event?.date}}</div>
      <div [ngSwitch]="event?.time">
        Time: {{event?.time}}
        <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
        <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
        <span *ngSwitchDefault>(Normal Start)</span>
      </div>
      <div>Price: \${{event?.price}} </div>
      <div *ngIf="event?.location">
        <span>Location: {{event?.location?.address}}</span>
        <span class="pad-left"></span>
        <span> {{event?.location?.city}}, {{event?.location?.country}}</span>
      </div>
      <div *ngIf="event?.onlineUrl">
        Online Url: {{event?.onlineUrl}}
      </div>
    </div>
`,
  styles: [`
  .thumbnail {min-height:210px}
  .pad-left { margin-left: 10px; }
  .well div { color: #bbb; }
`]
})

export class EventThumbnailComponent {
  @Input() event!: IEvent;

  constructor(private toastrService:ToastrService){}

}
