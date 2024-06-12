import { Injectable, inject } from '@angular/core';
import { PollAnswer, Poll, QuestionType, User } from './model';
import { API_URL } from '../../config';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GameData } from './model';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  private httpClient = inject(HttpClient);

  username: string | null = null;
  readonly students$: BehaviorSubject<User[]> = new BehaviorSubject([{name: "marek"}, {name: "czarek"}, {name: "darek"}]);

  readonly pollTemplate$: BehaviorSubject<Poll> = new BehaviorSubject({
    title: "Co uważasz o swoich koleżankach i kolegach?",
    description: "Lorem ipsum",
    questions: {
      "Czy ta osoba w ogóle istnieje?": {
        text: "Czy ta osoba w ogóle istnieje?",
        type: QuestionType.TEXTBOX
      },
      "Czy ta osoba jest miła?": {
        text: "Czy ta osoba jest miła?",
        type: QuestionType.TEXTBOX
      },
    }
  } as Poll);

  constructor() {
    //TODO: get the username from localstorage, so student can skip the poll regarding themself 

    // let username = localStorage.getItem("username");
    // if (username) {
    //   this.username = username;
    // } else {
    //   alert("Nie jesteś zalogowany!");
    //   //redirect or throw an error instead of letting user fill the poll
    // }
    this.httpClient.get<GameData>(`${API_URL}/game/data`).subscribe(response => {
        console.log(response);
        this.pollTemplate$.next(response.poll)
        this.students$.next(response.users)
    })
  }

  fetchInfo() {
    //IMPORTANT!
    //.questions have to be mapped to array (and are mapped in the poll-component), or the questions' original order won't be preserved while using keyvalue pipe 
    
    //TODO SCRUM-82: fetch a poll template from server and store it
    // fetch(`${API_URL}/game/data`)
    // .then(res => {res.json()})  
    // .then(json: {} => {
    //     this.pollTemplate$.next({json.poll})
    //     this.students$.next([json.students])
    // })
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
