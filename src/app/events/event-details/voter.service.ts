import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { ISession } from "../shared";

@Injectable({
  providedIn: 'root'
})

export class VoterService {
  constructor(
    private http:HttpClient
  ){}

  deleteVoter(eventId:number,session: ISession, voterName: string) {
    session.voters = session.voters.filter(voter => voter !== voterName);
    let url =`/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
    this.http.delete(url).pipe(catchError(this.handleError('deleteVote'))).subscribe();
  }

  addVoter(eventId:number,session:ISession,voterName:string){
    session.voters.push(voterName);
    let options ={headers:new HttpHeaders({'Content-Type':'application/json'})};
    let url =`/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
    this.http.post(url,{},options).pipe(catchError(this.handleError('AddVote'))).subscribe();
  }

  userHasVoted(session:ISession,voterName:string){
    return session.voters.some(voter => voter === voterName);
  }

  private handleError<T>(operation = 'operation',result?:T){
    return (error:any):Observable<T> =>{
      console.error(error);
      return of(result as T);
    }
  }
}
