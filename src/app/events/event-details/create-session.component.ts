import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ISession, restrictedWords } from "../shared";

@Component({
  selector:'create-session',
  templateUrl: './create-session.component.html',
  styles: [`
    em {float:right; color:#E05C65; padding-left:10px}
    .error {background-color:#E3C3C5;}
    .error ::-webkit-input-placeholder {color: #999;}
    .error ::-moz-placeholder {color: #999;}
    .error :-moz-placeholder {color:#999;}
    .error :-ms-input-placeholder {color:#999;}
  `]
})

export class CreateSessionComponent implements OnInit {
  newSessionForm!: FormGroup;
  @Output() saveNewSession = new EventEmitter();
  @Output() cancelAddSession = new EventEmitter();

  constructor(
    private frmBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.newSessionForm = this.frmBuilder.group({
      name: ['', Validators.required],
      presenter: ['', Validators.required],
      duration: [undefined,Validators.required],
      level: ['', Validators.required],
      abstract: ['', [Validators.required, Validators.maxLength(400),restrictedWords(['wick','test'])]]
    });
  }

  saveSession(formValues:any){
    let session:ISession = {
      id:0,
      name:formValues.name,
      presenter: formValues.presenter,
      duration: +formValues.duration,
      level: formValues.level,
      abstract: formValues.abstract,
      voters: []
    }
   this.saveNewSession.emit(session);
  }

  cancel(){
    this.cancelAddSession.emit();
  }
}
