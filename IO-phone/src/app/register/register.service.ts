import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { LobbyEvent, LobbyEventStatus, LobbyEventMessages } from './model';


const SERVER_URL = "http://localhost:8000" 


@Injectable({
  providedIn: 'root'
})
export class RegisterService implements OnDestroy {

  public readonly status: Subject<LobbyEvent> = new Subject();

  public sse: EventSource | null = null;

  ngOnDestroy() {
    this.sse?.close();
  }

  register(username: string): void {
      this.sse = new EventSource(
        `${SERVER_URL}/user/register/${username}`,
        { withCredentials: true, }        //makes it possible to connect with server with different origin
      );
  
      this.sse.onerror = e => {
        console.log("error:", e);
        //EventSource API doesn't make it possible to get status code of error,
        //so we are probably forced to stick with generic error message 
        this.status.next({status: LobbyEventStatus.FAILED});
        this.sse?.close();
      }
  
      this.sse.onmessage = e => {
        console.log("Message: ", e);


        switch (e.data) {
          case LobbyEventMessages.SUCCESS:          
            this.status.next({status: LobbyEventStatus.SUCCESS});
            break;
          case LobbyEventMessages.START:
            this.status.next({status: LobbyEventStatus.SESSION_STARTED});
            break;
          case LobbyEventMessages.USER_KICKED:
            this.status.next({status: LobbyEventStatus.USER_KICKED});
            break;
          default:
            console.error("Unknown message: ", e);
            break;
        }
      }
  }
}
