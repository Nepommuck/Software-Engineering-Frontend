import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student } from './shared/model';
import { LobbyService } from './lobby.service';

import { Router } from '@angular/router';
import { MaterialModule } from '../material.module';
import { SavedPoll } from '../polls/model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'lobby',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css'
})


export class LobbyComponent implements OnInit{
  private lobbyService = inject(LobbyService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private snackBar = inject(MatSnackBar);

  public ip = "";

  students = [] as Student[];
  polls = [] as SavedPoll[];

  selectedPollId = "0";

  ngOnInit(): void {
    this.lobbyService.students$.subscribe(next => {
      this.students = next;
      
      //apparently Angular components don't update 
      //if the object ref doesn't change, so we need to force the update
      this.cdr.detectChanges()
    })

    this.lobbyService.serverIp.subscribe(value => {
      this.ip = value["ipAddress"];
    });

    this.lobbyService.polls.subscribe(polls => {
      this.polls = polls;
    })
  }

  async deleteStudent(student: Student) {
    await this.lobbyService.removeUser(student);
  }


  startGame() {
    //TODO:
    //- display modal
    //- redirect to next page on accept
    
    if (this.selectedPollId !== "0") {
      this.lobbyService.startSession().then(
        () => {
          this.router.navigate(["/", "progress"]);
        }
      ).catch(err => {
        this.snackBar.open("Nie udało sie połączyć z serwerem! Upewnij się że jest on włączony.", "Zamknij");
        console.error("error: ", err);
      })
    } else {
      this.snackBar.open("Nie wybrano ankiety!", "Zamknij");
    }
  }

  cancelGame() {
    //TODO:
    //- display modal
    //- redirect to Home page
  }
}
