import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { IUser } from "./user.model";

@Injectable({
  providedIn: "root"
})

export class AuthService {
  currentUser!: any;
  constructor(private http: HttpClient) { }
  options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  loginUser(userName: string, password: string) {

    let loginInfo = { username: userName, password: password };

    return this.http.post<{ success: boolean, user: IUser }>('/api/login', loginInfo, this.options)
      .pipe(tap(data => {
        this.currentUser = <IUser>data.user
      }))
      .pipe(catchError(err => {
        return of(false);
      }));
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  checkAuthenticationStatus() {
    this.http.get('/api/currentIdentity').pipe(tap(data => {
      if (data instanceof Object) {
        this.currentUser = <IUser>data;
      }
    })).subscribe();
  }

  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;

    return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, this.options).pipe(catchError(err => {
      console.error(err);
      return of(false);
    }));
  }

  logout() {
    this.currentUser = undefined;
    return this.http.post('/api/logout', {}, this.options);
  }
}
