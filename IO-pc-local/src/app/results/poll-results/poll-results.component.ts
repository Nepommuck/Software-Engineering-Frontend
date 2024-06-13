import {Component, inject, OnInit} from '@angular/core';
import {PollResultsService} from "../poll-results.service";
import {PollResults, SinglePersonPollResults} from "../model";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatButton, MatIconButton} from "@angular/material/button";
import {SinglePersonResultsComponent} from "../single-person-results/single-person-results.component";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

const POLL_RESULTS_AUTO_RELOAD_TIMEOUT = 5_000

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
    SinglePersonResultsComponent,
    MatProgressSpinner
  ],
  templateUrl: './poll-results.component.html',
  styleUrl: './poll-results.component.css'
})
export class PollResultsComponent implements OnInit {
  private readonly pollResultsService = inject(PollResultsService)

  protected pollResults?: PollResults = undefined
  protected isLoading = true
  protected selectedSinglePersonResults?: SinglePersonPollResults = undefined

  ngOnInit(): void {
    this.loadPollResults()
    this.setPollResultsAutoReload(POLL_RESULTS_AUTO_RELOAD_TIMEOUT)
  }

  protected selectSinglePerson(results: SinglePersonPollResults): void {
    this.selectedSinglePersonResults = results
  }

  protected deselectSinglePerson(): void {
    this.selectedSinglePersonResults = undefined
  }

  protected loadPollResults(): void {
    this.isLoading = true

    this.pollResultsService.pollResults.then(results => {
        this.isLoading = false
        this.pollResults = results

        // Update selected person results if possible
        const selectedPersonName = this.selectedSinglePersonResults?.personName
        if (selectedPersonName) {
          const updatedSinglePersonResults = results
            .find(singlePersonResults => singlePersonResults.personName == selectedPersonName)

          if (updatedSinglePersonResults) {
            this.selectedSinglePersonResults = updatedSinglePersonResults
          }
        }
      }
    ).catch(() => {
        this.isLoading = false
        this.pollResults = undefined
      }
    )
  }

  private setPollResultsAutoReload(timeoutMs: number) {
    setTimeout(() => {
      this.loadPollResults()
      this.setPollResultsAutoReload(timeoutMs)
    }, timeoutMs)
  }
}
