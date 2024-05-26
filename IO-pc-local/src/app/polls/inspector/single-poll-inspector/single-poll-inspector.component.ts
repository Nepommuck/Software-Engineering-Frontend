import {Component, inject, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {PollId, SavedPoll} from "../../model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {SavedPollsService} from "../../saved-polls.service";

@Component({
  selector: 'app-single-poll-inspector',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatButton,
    RouterLink
  ],
  templateUrl: './single-poll-inspector.component.html',
  styleUrl: './single-poll-inspector.component.css'
})
export class SinglePollInspectorComponent implements OnInit {
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
