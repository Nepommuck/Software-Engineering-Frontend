import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Student } from './shared/model';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {
  public readonly students = new Subject<Student[]>();
  private sse: EventSource | null = null;


  constructor() {
    this.sse = new EventSource("http://localhost:8000/game/lobby", 
    { withCredentials: true, });

    this.sse.onopen = open => {
      console.log("open: ", open);
    }

    this.sse.onmessage = msg => {
      console.log(msg.data);
      this.students.next(JSON.parse(`${msg.data}`))
    }

    this.sse.onerror = err => {
      console.error("SSE ERROR: ", err);
    }
  }

  get students$(): Observable<Student[]> {
    return this.students.asObservable();
  }

  removeUser(student: Student) {
    //TODO: notify the server about the removal
    return fetch(`http://localhost:8000/remove/${student.name}`, {
      method: "post"
    })
    // this.students.next(this.students.getValue().filter(x => x.name !== student.name));
  }

  startSession() {
    return fetch("http://localhost:8000/start-game", {
      method: "post"
    })
    // .then(res => {}) //TODO: handle any errors?
    ;
  }
}
