import {Component, inject} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {SavedPollsService} from "../../saved-polls.service";
import {MatTooltip} from "@angular/material/tooltip";
import {Poll} from "../../model";

@Component({
  selector: 'app-saved-polls-list',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatButton,
    RouterLink,
    MatTooltip
  ],
  templateUrl: './saved-polls-list.component.html',
  styleUrl: './saved-polls-list.component.css'
})
export class SavedPollsListComponent {
  private savedPollsService = inject(SavedPollsService)
  protected savedPolls = this.savedPollsService.allPolls

  constructor() {
    this.savedPollsService.pollsChange$.subscribe(allPolls => {
      this.savedPolls = allPolls
    })
  }

  protected removePoll(poll: Poll): void {
    this.savedPollsService.removePoll(poll)
  }
}
