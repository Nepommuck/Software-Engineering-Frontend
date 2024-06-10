import { Component, OnInit, inject } from '@angular/core';
import { PollService } from './poll.service';
import { Poll, Question, Student } from './model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
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
export class PollComponent{
  private pollService = inject(PollService);
  pollTemplate: Poll | null = null;
  questions: Question[] = [];
  students: Student[] = [];
  

  currentStudentIndex = -1;


  constructor() {
    this.pollService.students$.subscribe(students => {
      this.students = students;
      this.currentStudentIndex = 0;
    })
    
    this.pollService.pollTemplate$.subscribe(template => {
      let questions = [];

      // questions must be mapped to array, or the their original order won't be preserved because of the keyvalue pipe 
      for (let [_key, value] of Object.entries(template.questions)) {
        questions.push(value);
      }

      this.pollTemplate = template;
      this.questions = questions;
    });

    
    this.pollService.fetchInfo();
  }


  submitForm() {
    //TODO: handle forms

    this.pollService.saveAnswers().then(() => {
      if (this.currentStudentIndex < this.students.length - 1) {
        this.currentStudentIndex++;
        this.clearForm();
      } else {
        alert("Wypelniono wszystkie ankiety!");
        //TODO: redirect to responses
      }
    })
  }

  clearForm() {

  }
}
