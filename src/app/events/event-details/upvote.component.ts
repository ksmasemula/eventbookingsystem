import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'upvote',
  template: `
  <div class="voitingWidgetContainer pointable" (click)="onClick()">
    <div class="well votingWidget">
      <div class="votingButton">
        <i class="glyphicon glyphicon-heart" [style.color]="iconColor"></i>

      </div>
      <div class="badge badge-inverse votingCount">
        <div>{{count}}</div>
      </div>
    </div>
  </div>

  `,
  styleUrls: ['upvote.component.css']
})

export class UpvoteComponent {

  @Input() count?: number;
  @Input() set voted(val:boolean){
    val?this.iconColor = 'red':this.iconColor='white';
  };
  @Output() vote = new EventEmitter();
  iconColor:string = 'white';

  onClick() {
    this.vote.emit({});
  }
}
