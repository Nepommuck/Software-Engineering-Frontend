import { Injectable, inject } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Student } from './shared/model';
import { API_URL } from '../../config';
import { PollField } from '../polls/model'; 


import { HttpClient } from '@angular/common/http';
import { SavedPoll } from '../polls/model';


interface GetServerIpResponse {
  readonly ipAddress: string
}

interface GetServerIpResponse {
  readonly ipAddress: string
}

@Injectable({
  providedIn: 'root'
})
export class LobbyService {
  public readonly students = new Subject<Student[]>();
  private sse: EventSource;

  private httpClient = inject(HttpClient);
  public readonly serverIp = this.httpClient.get<GetServerIpResponse>(`${API_URL}/ip`);
  // TODO SCRUM-88: fetch poll list from server
  // public readonly polls = this.httpClient.get<SavedPoll[]>(`${API_URL}/...`)

  public readonly polls = new BehaviorSubject([
    {id: 1, name: "Jak oceniasz uczniów w swojej klasie?", fields: ([] as readonly PollField[])} as SavedPoll,
    {id: 2, name: "Co robisz po zajęciach szkolnych?", fields: ([] as readonly PollField[])},
  ]).asObservable();


  constructor() {
    this.sse = new EventSource(`${API_URL}/game/lobby`, 
    { withCredentials: true, });

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
    return fetch(`${API_URL}/user/remove/${student.name}`, {
      method: "post"
    })
  }

  startSession() {
    return fetch(`${API_URL}/game/start`, {
      method: "post"
    })
    // .then(res => {}) //TODO: handle any errors?
    ;
  }
}
