import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Student } from './shared/model';

import { API_URL } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {
  public readonly students = new Subject<Student[]>();
  private sse: EventSource;


  constructor() {
    this.sse = new EventSource(`${API_URL}/game/lobby`, 
    { withCredentials: true, });

    this.sse.onopen = open => {
      console.log("open: ", open);
    }

    this.sse.onmessage = msg => {
      console.log(msg.data);
      this.students.next(JSON.parse(msg.data))
    }

    this.sse.onerror = err => {
      console.error("SSE ERROR: ", err);
    }
  }

  get students$(): Observable<Student[]> {
    return this.students.asObservable();
  }

  removeUser(student: Student) {
    return fetch(`${API_URL}/remove/${student.name}`, {
      method: "post"
    })
  }

  startSession() {
    return fetch(`${API_URL}/start-game`, {
      method: "post"
    })
    // .then(res => {}) //TODO: handle any errors?
    ;
  }
}
