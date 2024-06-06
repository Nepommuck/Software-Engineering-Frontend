import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student } from './shared/model';
import { LobbyService } from './lobby.service';

import { Router } from '@angular/router';
import { MaterialModule } from '../material.module';

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

  public ip = "";

  students = [] as Student[];

  ngOnInit(): void {
    this.lobbyService.students$.subscribe(next => {
      this.students = next;
      
      //apparently Angular components don't update 
      //if the object ref doesn't change, so we need to force the update
      this.cdr.detectChanges()
    })

    this.lobbyService.serverIp.subscribe(value => {
      // console.log(value)
      this.ip = value["ipAddress"];
    });
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
