import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student } from './shared/model';
import { LobbyService } from './lobby.service';
import { Observable } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'lobby',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule, MatCard, MatCardContent, MatIcon
  ],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css'
})


export class LobbyComponent implements OnInit{
  private lobbyService = inject(LobbyService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  students = [] as Student[];

  constructor(){
    // this.students$ = this.lobbyService.students$;
  }

  ngOnInit(): void {
    this.lobbyService.students$.subscribe(next => {
      this.students = next;
      
      //apparently Angular components don't update 
      //if the object ref doesn't change, so we need to force the update
      this.cdr.detectChanges()
    })
  }

  async deleteStudent(student: Student) {
    await this.lobbyService.removeUser(student);
  }


  startGame() {
    //TODO:
    //- display modal
    //- redirect to next page on accept

    this.lobbyService.startSession().then(
      () => {
        //TODO: HANDLE NETWORK ERRORS!
        this.router.navigate(["/", "progress"]);
      }
    ).catch(err => {
      alert("Nie udało się rozpocząć sesji!");
      console.log("error: ", err);
    })
  }

  cancelGame() {
    //TODO:
    //- display modal
    //- redirect to Home page
  }
}
