import { Component, Inject, OnInit } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Toastr, TOASTR_TOKEN } from '../common/toastr.service';
import { AuthService } from './auth.service';

@Component({
  templateUrl: './profile.component.html',
  styles: [`
    em {float:right; color:#E05C65; padding-left:10px}
    .error{background-color:#E3C3C5;}
    .error ::-webkit-input-placeholder {color: #999;}
    .error ::-moz-placeholder {color: #999;}
    .error :-moz-placeholder {color:#999;}
    .error :-ms-input-placeholder {color:#999;}
  `]
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  firstName!: FormControl;
  lastName!: FormControl;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(TOASTR_TOKEN) private toastr:Toastr
  ) { }

  ngOnInit(): void {
    this.firstName = new FormControl(this.authService.currentUser?.firstName, Validators.required);
    this.lastName = new FormControl(this.authService.currentUser?.lastName, Validators.required);

    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    });
  }

  validateField(control:AbstractControl) {
    return control.invalid && control.dirty?'error':'';
  }

  updateUser(formValues: any) {
    this.authService.updateCurrentUser(formValues.firstName, formValues.lastName);
    this.toastr.success('Profile Updated');
    this.router.navigate(['events']);
  }

  cancel(){
    this.router.navigate(['events']);
  }
}
