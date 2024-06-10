import { Component, OnInit, inject } from '@angular/core';
import { PollService } from './poll.service';
import { Poll } from './model';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule, MatFormFieldModule, MatInputModule, MatInputModule
  ],
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.css'
})
export class PollComponent implements OnInit {
  private pollService = inject(PollService);
  protected pollTemplate: Poll;

  constructor() {
    this.pollTemplate = this.pollService.getPollTemplate();
  }

  ngOnInit(): void {
    //TODO SCRUM-82: fetch a poll template from server and store it
    // this.pollService.getPollTemplate(); 
  }
  
  submitForm() {
    this.pollService.saveAnswers()
      .then(response => response.text())
      .then(text => {console.log(text)})
      .catch(error => {
        alert("Przy zapisywaniu odpowiedzi nastąpił niespodziewany błąd!");
        console.error(error);
      });
  }
}
