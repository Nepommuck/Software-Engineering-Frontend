import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IStudent } from './shared/model';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {
  private readonly _students: BehaviorSubject<IStudent[]> = new BehaviorSubject([] as IStudent[]);
  public students$: Observable<IStudent[]> = this._students.asObservable();
  private sse: EventSource | null = null;

  constructor() {
    // this.sse = new EventSource("http://localhost:8000/", 
    // { withCredentials: true, });
    this._students.next(
      [{name: "Maciuś"}, {name: "Zuzia"}, {name: "Franek"}, {name: "Janek"}]
    )
  }

  removeUser(student: IStudent): void {
    //TODO: notify the server about the removal
    this._students.next(this._students.getValue().filter(x => x.name != student.name));
  }

  startSession() {
    return fetch("http://localhost:8000/start-game", {
      method: "post"
    })
    // .then(res => {}) //TODO: handle any errors?
    ;
  }
}
