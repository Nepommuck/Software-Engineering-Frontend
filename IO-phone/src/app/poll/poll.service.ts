import { Injectable } from '@angular/core';
import { PollAnswer, Poll, QuestionType, Student } from './model';
import { API_URL } from '../../config';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PollService {

  readonly students$: BehaviorSubject<Student[]> = new BehaviorSubject([{name: "marek"}, {name: "czarek"}, {name: "darek"}]);

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
      // TODO: handle different types of fields
      // "Jak bardzo jest pomocna?": {
      //   text: "Jak bardzo jest pomocna?",
      //   type: QuestionType.SINGLE_CHOICE
      // },
      // "Które cechy z poniższych pasują do tej osoby?": {
      //   text: "Jak bardzo jest pomocna?",
      //   type: QuestionType.MULTIPLE_CHOICE
      // },
    }
  } as Poll);

  fetchInfo() {
    //IMPORTANT!
    //.questions have to be mapped to array (and are mapped in the poll-component), or the questions' original order won't be preserved while using keyvalue pipe 
    
    //TODO SCRUM-82: fetch a poll template from server and store it
    // fetch(`${API_URL}/...`)
    // .then(res => {res.json()})  
    // .then(json => {
    //     this.pollTemplate$.next({})
    //     this.students$.next([])
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
