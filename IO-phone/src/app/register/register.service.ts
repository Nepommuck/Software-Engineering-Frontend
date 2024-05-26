import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LobbyEvent, LobbyEventStatus } from './model';

const SERVER_URL = "http://localhost:8000" 
const SUCCESS_MSG = "registered successfully";


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  public readonly status: Subject<LobbyEvent> = new Subject();

  public sse: EventSource | null = null;

  constructor() { }

  ngOnDestroy() {
    this.sse?.close();
  }

  register(username: string): void {
    //TODO: try to register to SSE, and await info about session start/user being kicked out;

    // try {
      this.sse = new EventSource(
        `${SERVER_URL}/register/${username}`,
        { withCredentials: true, }        //makes it possible to connect with server with different origin
      );

      // this.sse.onopen = e => {
        // console.log("open", e);
        // this.status.next({status: LobbyEventStatus.SUCCESS});
      // }
  
      this.sse.onerror = (e) => {
        console.log("error:", e);
        //EventSource API doesn't allow to get status code of error, so we are probably forced to stick with generic error message 
        this.status.next({status: LobbyEventStatus.FAILED});
        this.sse?.close();
      }
  
      this.sse.onmessage = e => {
        console.log("Message: ", e);
        if (e.data === SUCCESS_MSG) {
          this.status.next({status: LobbyEventStatus.SUCCESS});
        } else {
          console.log("Unknown message: ", e);
        }
        //TODO: handle different events
      }
    // } catch {
      // if (this.sse?.OPEN) {
      //   this.sse.close();
      // }
      // console.log("error!!!")
      // this.status.next({status: LobbyEventStatus.FAILED});
    // }
  }
}
