import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LobbyEvent, LobbyEventStatus } from './model';

const SERVER_URL = "http://localhost:8000" 

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  public readonly status: Subject<LobbyEvent> = new Subject();

  // public sse: EventSource;

  constructor() { }

  register(username: string): void {
    //TODO: try to register to SSE, and await info about session start/user being kicked out;

    fetch(`${SERVER_URL}/register`, {
      method: "POST",
      mode: 'cors',
      headers: new Headers({"content-type": "application/json"}),
      body: JSON.stringify({
        "name": username
      })
    })
    .then(res => {
      switch (res.status) {
        case 200:
          this.status.next({status: LobbyEventStatus.SUCCESS});

          // this.sse =
          // new EventSource(`${SERVER_URL}/`);
          break;
        case 409:   //HTTP 409 Conflict - User already exists
          this.status.next({status: LobbyEventStatus.DUPLICATE_USER});
          break;
        default:
          this.status.next({status: LobbyEventStatus.UNKNOWN_ERROR});
          break;
      }
    }).catch(err => {
        this.status.next({status: LobbyEventStatus.FAILED});
    });
  }
}
