import {Component, inject, OnInit} from '@angular/core';
import {PollResultsService} from "../poll-results.service";
import {PollResults, SinglePersonPollResults} from "../model";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatButton, MatIconButton} from "@angular/material/button";
import {SinglePersonResultsComponent} from "../single-person-results/single-person-results.component";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-poll-results',
  standalone: true,
  imports: [
    MatCardContent,
    MatCard,
    MatButton,
    MatIcon,
    MatIconButton,
    MatTooltip,
    SinglePersonResultsComponent
  ],
  templateUrl: './poll-results.component.html',
  styleUrl: './poll-results.component.css'
})
export class PollResultsComponent implements OnInit {
  private readonly pollResultsService = inject(PollResultsService)

  protected pollResults?: PollResults = undefined
  protected error = false
  protected selectedSinglePersonResults?: SinglePersonPollResults = undefined

  ngOnInit(): void {
    this.loadPollResults()
  }

  protected selectSinglePerson(results: SinglePersonPollResults): void {
    this.selectedSinglePersonResults = results
  }

  protected deselectSinglePerson(): void {
    this.selectedSinglePersonResults = undefined
  }

  private loadPollResults(): void {
    this.pollResultsService.pollResults.then(results => {
        this.error = false
        this.pollResults = results
      }
    ).catch(() => {
        this.error = true
      }
    )
  }
}
