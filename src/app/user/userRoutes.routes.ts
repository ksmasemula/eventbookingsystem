import { Routes } from "@angular/router";
import { LoginComponent } from "./login.component";
import { ProfileComponent } from "./profile.component";

export const userRoutes:Routes = [
  {path:'login',component:LoginComponent},
  {path:'profile',component:ProfileComponent}
]
