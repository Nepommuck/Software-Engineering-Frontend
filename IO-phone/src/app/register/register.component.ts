import { Component, inject, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LobbyEventStatus } from './model';
import { ChangeDetectorRef } from '@angular/core';

import {MatButtonModule} from "@angular/material/button";
import {MatInputModule, MatInput} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { RegisterService } from './register.service';
import { RegistrationFormValue } from './model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    MatButtonModule, MatFormFieldModule, MatInputModule, MatInput
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private readonly registerService = inject(RegisterService);
  private readonly ngZone = inject(NgZone);

  isRegistered: boolean = false;
  model: RegistrationFormValue = {
    name: ""
  };

  ngOnInit() {
    this.registerService.status.subscribe(msg => {
      switch (msg.status) {
        case LobbyEventStatus.SUCCESS:
          this.isRegistered = true;
          break;
        case LobbyEventStatus.SESSION_STARTED:
          localStorage.setItem("username", this.model.name);
          
          this.ngZone.run(() => { //fix for the PollComponent not rendering properly on .navigate()
            this.router.navigate(["poll"]);
          })
          break;
        case LobbyEventStatus.FAILED:
          this.isRegistered = false;
          this.displayErrorMesage("Nie udało się dołączyć do sesji.");
          break;
        case LobbyEventStatus.DUPLICATE_USER:
          this.isRegistered = false;
          this.displayErrorMesage("Użytkownik o podanej nazwie już istnieje!");
          break;
        case LobbyEventStatus.USER_KICKED:
          this.isRegistered = false;
          this.displayErrorMesage("Zostałeś usunięty z pokoju, spróbuj połączyć się ponownie");
          this.model.name = "";
          break;
        case LobbyEventStatus.UNKNOWN_ERROR:
          this.isRegistered = false;
          this.displayErrorMesage("Wystąpił nieznany błąd.");
          break;
      }
      this.changeDetector.detectChanges();  // hack (?) allowing to detect changes of this.isRegistered and to update the component;
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
