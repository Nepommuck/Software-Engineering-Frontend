import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
const REGISTER_URL = "http://localhost:8000/register"

 

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  public readonly status: Subject<{}> = new Subject();

  constructor() { }

  register(username: string): Promise<boolean> {
    //TODO: try to register to server, and await info about session start/user being kicked out;

    //connect with server

    return fetch(REGISTER_URL, {
      method: "POST",
      mode: 'cors',
      headers: new Headers({"content-type": "application/json"}),
      body: JSON.stringify({
        "name": username
      })
    })
    .then(res => {
      if (res.status == 200) {
        console.log("Success")
        return true;
        // res.json();
      } else {
        console.log(res.status);
        console.log(res);
        return false;
      }
    }).catch(err => {
      alert("Nie udało się dołączyć do sesji!");
      console.log(err)
      return false;
    });
  }
}
