import {Component, inject, OnInit} from '@angular/core';
import {SavedPollsService} from "../../saved-polls.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PollId, SavedPoll} from "../../model";
import {PollEditorComponent} from "../poll-editor.component";

@Component({
  selector: 'app-existing-poll-editor',
  standalone: true,
  imports: [
    PollEditorComponent
  ],
  templateUrl: './existing-poll-editor.component.html',
})
export class ExistingPollEditorComponent implements OnInit {
  protected poll?: SavedPoll
  private savedPollsService = inject(SavedPollsService)
  private activatedRoute = inject(ActivatedRoute)
  private router = inject(Router)
  private pollId!: PollId

  ngOnInit(): void {
    const pollIdParam = this.activatedRoute.snapshot.paramMap.get("id")

    if (pollIdParam) {
      this.pollId = Number(pollIdParam)
      this.poll = this.savedPollsService.getPollById(this.pollId)
    }

    if (!this.poll) {
      console.error(`Failed to get poll with id: ${this.pollId}`)
      this.router.navigate([".."])
    }
  }
}
