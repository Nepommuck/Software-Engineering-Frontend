import { Component, OnInit, inject } from '@angular/core';
import { PollService } from './poll.service';
import { Answer, Poll, Question, User } from './model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatButtonModule, MatFormFieldModule, MatInputModule, MatInputModule
  ],
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.css'
})
export class PollComponent {
  protected pollService = inject(PollService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  pollTemplate: Poll | null = null;
  questions: Question[] = [];

  students: User[] = [];
  currentStudentIndex = -1;

  pollForm: FormGroup = this.formBuilder.group({});

  constructor() {
    this.pollService.students$.subscribe(students => {
      this.students = students;
      this.currentStudentIndex = 0;

      console.log(students);
    })
    
    this.pollService.pollTemplate$.subscribe(template => {
      if (template) {
        let questions = [];

        // questions must be mapped to array, or the their original order won't be preserved because of the keyvalue pipe 
        for (let [key, value] of Object.entries(template.questions)) {
          //there should be only only one place where the question text is stored, 
          //but apparently key is better than value.text if you test it with Swagger 
          questions.push({text: key, type: value.type});
  
          this.pollForm.addControl(key, this.formBuilder.control('', [Validators.required]));
        }
  
        this.pollTemplate = template;
  
        this.questions = questions;
      }

    });
  }
  



  submitForm() {
    if (this.pollForm.valid) {
      let answers = [];
      
      for (let question of this.questions) {
        let questionName = question.text;

        answers.push({
          question_name: questionName,
          answer: this.pollForm.get(questionName)!.value
        });
      }


      this.pollService.saveAnswers({
        answers: answers,
        "user_about": {
          "name": this.students[this.currentStudentIndex].name
        },
        "user_filling": {
          "name": this.pollService.username!
        }
      }).then(() => {
        if (this.currentStudentIndex < this.students.length - 1) {
          this.currentStudentIndex++;
          this.clearForm();
        } else {
          alert("Wypelniono wszystkie ankiety!");
          
          //TODO: redirect to responses
          this.router.navigate(["answers", this.pollService.username]);
        }
      })
    } else {
      //perhaps SnackBar would be better than alert
      alert("Wartości w arkuszu są niepoprawne! Sprawdź czy udzielono odpowiedzi na wszystkie pytania.");
      console.log("FORM:", this.pollForm);
    }

  }

  clearForm() {
      this.pollForm.reset();
  }

}
