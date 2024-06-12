import { Injectable, inject, Inject } from '@angular/core';
import { PollAnswer, Poll, QuestionType, User } from './model';
import { API_URL } from '../../config';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GameData } from './model';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  private httpClient = inject(HttpClient);

  private _username: string | null = null;
  private errorOccured = false;

  readonly students$: BehaviorSubject<User[]> = new BehaviorSubject([] as User[]);

  readonly pollTemplate$: BehaviorSubject<Poll | null> = new BehaviorSubject(null) as BehaviorSubject<Poll | null>;

  constructor(@Inject(DOCUMENT) private document: Document) {

    const localStorage = document.defaultView?.localStorage;

    if (localStorage) {
      let username = localStorage.getItem("username");
      if (username) {
        this._username = username;

        this.httpClient.get<GameData>(`${API_URL}/game/data`).subscribe(response => {
          console.log(response);
          this.pollTemplate$.next(response.poll)
          this.students$.next(response.users.filter(item => item.name != username));
        })
      } else {
        alert("Nie jesteś zalogowany!");
        //redirect or throw an error instead of letting user fill the poll
        this.errorOccured = true;
      }
    }
  }

  get error() {
    return this.errorOccured;
  }

  get username() {
    return this._username;
  }

  // TODO: implement saving answer for a single poll
  // public saveAnswers(filledPoll: FilledPoll): Promise<any> {
  saveAnswers(answer: PollAnswer): Promise<any> {
    return fetch(`${API_URL}/game/fill`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(answer)
      }
    )
    .then(response => {
      if (response.ok) {
        return response.text();

      } else {      
        throw new Error(`Przy zapisywaniu odpowiedzi nastąpił niespodziewany błąd: ${response.text()}`);
      }
    })
  }
}
