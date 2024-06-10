import { Injectable } from '@angular/core';
import { FilledPoll, Poll, Question, QuestionType } from './model';
import { API_URL } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  constructor() {
    // TOOD: implement fetching poll template and user list from server
  }


  public getPollTemplate(): Poll {
    return ({
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
        // 
        // "Jak bardzo jest pomocna?": {
        //   text: "Jak bardzo jest pomocna?",
        //   type: QuestionType.SINGLE_CHOICE
        // },
        // "Które cechy z poniższych pasują do tej osoby?": {
        //   text: "Jak bardzo jest pomocna?",
        //   type: QuestionType.MULTIPLE_CHOICE
        // },
      }
    })
  }

  // TODO: implement saving answer for a single poll
  // public saveAnswers(filledPoll: FilledPoll): Promise<any> {
  public saveAnswers(): Promise<any> {
    return fetch(`${API_URL}/game/fill`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "answers": [
          {
            "question_name": "Czy ta osoba w ogóle istnieje?",
            "answer": "niekoniecznie"
          },
          {
            "question_name": "Czy ta osoba jest miła?",
            "answer": "całkiem milusia"
          }
        ],
        "user_about": {
          "name": "marek"
        },
        "user_filling": {
          "name": "jarek"
        }
      })
    })
  }
}
