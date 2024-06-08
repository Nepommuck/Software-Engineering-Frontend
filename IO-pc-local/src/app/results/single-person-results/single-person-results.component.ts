import {Component, EventEmitter, input, OnInit, Output} from '@angular/core';
import {SinglePersonPollResults, SingleQuestionPollResults} from "../model";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";

type QuestionWithVisibility = SingleQuestionPollResults & {
  isVisible: boolean,
}

@Component({
  selector: 'app-single-person-results',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatIcon,
    MatIconButton,
    MatTooltip,
    MatButton
  ],
  templateUrl: './single-person-results.component.html',
  styleUrl: './single-person-results.component.css'
})
export class SinglePersonResultsComponent implements OnInit {
  results = input.required<SinglePersonPollResults>()
  @Output() exit = new EventEmitter<void>();

  protected questionsWithVisibility!: QuestionWithVisibility[]

  ngOnInit(): void {
    this.questionsWithVisibility = this.results()
      .questions
      .map(question => ({...question, isVisible: false}))
  }

  protected makeVisible(question: QuestionWithVisibility): void {
    if (!question.isVisible) {
      question.isVisible = true
    }
  }

  protected switchVisibility(question: QuestionWithVisibility): void {
    question.isVisible = !question.isVisible
  }

  protected showAllQuestions() {
    this.setDefaultVisibilityValue(true)
  }

  protected hideAllQuestions() {
    this.setDefaultVisibilityValue(false)
  }

  private setDefaultVisibilityValue(visibility: boolean): void {
    this.questionsWithVisibility.forEach(question => {
      question.isVisible = visibility
    })
  }
}
