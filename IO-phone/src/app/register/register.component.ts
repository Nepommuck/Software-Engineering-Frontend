import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LobbyEvent, LobbyEventStatus } from './model';
import { ChangeDetectorRef } from '@angular/core';

import {MatButton} from "@angular/material/button";

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { RegisterService } from './register.service';
import { IStudent } from './model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    MatButton, MatFormFieldModule, MatInputModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isRegistered: boolean = false;
  model: IStudent = {
    name: ""
  };

  constructor(
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private registerService: RegisterService
  ) {
  }

  ngOnInit() {
    this.registerService.status.subscribe(msg => {
      console.log("subscribe triggered");
      switch (msg.status) {
        case LobbyEventStatus.SUCCESS:
          this.isRegistered = true;
          break;
        case LobbyEventStatus.SESSION_STARTED:
          //TODO: REDIRECT TO NEXT PHASE
          break;
        case LobbyEventStatus.FAILED:
          this.isRegistered = false;
          this.displayErrorMesage("Nie udało się dołączyć do sesji.");
          break;
        case LobbyEventStatus.DUPLICATE_USER:
          this.displayErrorMesage("Użytkownik o podanej nazwie już istnieje!");
          break;
        case LobbyEventStatus.USER_KICKED:
          this.displayErrorMesage("Zostałeś usunięty z pokoju, spróbuj połączyć się ponownie");
          break;
        case LobbyEventStatus.UNKNOWN_ERROR:
          this.displayErrorMesage("Wystąpił nieznany błąd.");
          break;
      }
      this.changeDetector.detectChanges();  // hack (?) allowing to detect changes of this.isRegistered and update the component;
                                            // for some reason the view doesn't update without it  
    });
  }

  ngOnDestroy() {
    this.registerService.status.unsubscribe();
  }

  submitForm() {
    

    this.registerService.register(this.model.name);
  }

  displayErrorMesage(msg: string) {
    alert(msg);
  }
}
