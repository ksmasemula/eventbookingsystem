import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { Toastr, TOASTR_TOKEN } from "../common";
import { AuthService } from "./auth.service";
import { IUser } from "./user.model";

@Component({
  templateUrl: './login.component.html',
  styles: [`
    em {float:right; color:#E05C65; padding-left:10px;}
  `]
})

export class LoginComponent {
  userName!: any;
  password!: any;

  constructor(
    private authService: AuthService,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private router: Router
  ) { }

  login(data: any) {
    this.authService.loginUser(data.userName, data.password).subscribe(resp => {
      if (!resp) {
        this.toastr.error('Invalid login credentials', 'Login Error');
        return;
      }
      this.toastr.success(`Welcomback ${this.authService.currentUser.firstName}`, 'Login Successful')
      this.router.navigate(['/events']);
    });
  }

  cancel() {
    this.router.navigate(['events']);
  }
}
