import { Injectable, inject } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Student } from './shared/model';
import { API_URL } from '../../config';

import { HttpClient } from '@angular/common/http';


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
