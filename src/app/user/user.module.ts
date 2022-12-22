import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile.component";
import { userRoutes } from "./userRoutes.routes";
import { LoginComponent } from "./login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations:[
    LoginComponent,
    ProfileComponent
  ],
 imports:[
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule.forChild(userRoutes)
 ]
})

export class UserModule { }
