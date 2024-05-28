import { Component } from '@angular/core';
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


export class LobbyComponent {

  public students$: Observable<Student[]>;

  constructor(private router: Router,private lobbyService: LobbyService){
    this.students$ = lobbyService.students$;
  }


  deleteStudent(student: Student) {
    this.lobbyService.removeUser(student);
  }

  async startGame() {
    //TODO:
    //- display modal
    //- redirect to next page on accept

    await this.lobbyService.startSession();
    this.router.navigate(["/", "progress"]);
  }

  cancelGame() {
    //TODO:
    //- display modal
    //- redirect to Home page
  }
}
