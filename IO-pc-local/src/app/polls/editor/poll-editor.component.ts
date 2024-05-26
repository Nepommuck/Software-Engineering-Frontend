import {Component, inject, input, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {PollFieldId, SavedPoll} from "../model";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatRow} from "@angular/material/table";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router, RouterLink} from "@angular/router";
import {SavedPollsService} from "../saved-polls.service";
import {UnsavedPollService} from "../unsaved-poll.service";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-poll-editor',
  standalone: true,
  imports: [
    FormsModule,
    MatIcon,
    MatIconButton,
    MatButton,
    MatFormField,
    MatRow,
    RouterLink,
    MatTooltip
  ],
  templateUrl: './poll-editor.component.html',
  styleUrl: './poll-editor.component.css'
})
export class PollEditorComponent implements OnInit {
  private readonly unsavedPollService = inject(UnsavedPollService)
  private readonly savedPollsService = inject(SavedPollsService)
  private readonly router = inject(Router)
  private readonly snackBar = inject(MatSnackBar)

  pollToEdit = input<SavedPoll>()

  protected newQuestionInputValue: string = ""
  protected fieldsNumberMessage = ""
  protected newPollName = ""
  protected currentPoll = this.unsavedPollService.poll

  ngOnInit(): void {
    const pollToEdit = this.pollToEdit()
    if (pollToEdit) {
      this.unsavedPollService.load(pollToEdit)
      this.newPollName = pollToEdit.name
      this.currentPoll = pollToEdit
    }

    this.updateFieldsNumberMessage()

    this.unsavedPollService.pollChanges$.subscribe(updatedPoll => {
        this.currentPoll = updatedPoll
        this.updateFieldsNumberMessage()
      }
    )
  }

  protected addField(): void {
    const validationResult = this.validatePollInput()

    if (validationResult !== null) {
      this.unsavedPollService.addField(validationResult)
      this.newQuestionInputValue = ""
    }
  }

  protected removeField(fieldId: PollFieldId): void {
    this.unsavedPollService.removeField(fieldId)
  }

  protected moveFieldUp(fieldId: PollFieldId): void {
    this.unsavedPollService.changeFieldOrder(fieldId, "up")
  }

  protected moveFieldDown(fieldId: PollFieldId): void {
    this.unsavedPollService.changeFieldOrder(fieldId, "down")
  }

  protected savePollHandler(): void {
    this.currentPoll = {
      ...this.currentPoll,
      name: this.newPollName,
    }
    const validationResult = this.validateWholePoll()

    if (validationResult == "no-questions") {
      this.snackBar.open("Aby zapisać ankietę, musisz stworzyć chociaż jedno pytanie", "OK")
    } else if (validationResult == "empty-poll-name") {
      this.snackBar.open("Aby zapisać ankietę, musisz nadać jej tytuł", "OK")
    } else if (validationResult == "ok") {
      const pollToEdit = this.pollToEdit()

      if (pollToEdit) {
        this.savedPollsService.updateExistingPoll(pollToEdit.id, this.currentPoll)
      } else {
        this.savedPollsService.addPoll(this.currentPoll)
      }

      this.unsavedPollService.restart()

      // TODO It fails with 'NG04014: Invalid configuration of route 'polls/new'. One of the following must be
      //  provided: component, loadComponent, redirectTo, children or loadChildren'. I don't understand why
      // this.router.navigate([RoutePaths.Polls.All])

      this.router.navigate(["polls"])
    }
  }

  private updateFieldsNumberMessage(): void {
    function getQuestionKeyword(fieldsNumber: number): string {
      if (fieldsNumber === 1)
        return "pytanie"
      if ((fieldsNumber < 10 || fieldsNumber > 20) && [2, 3, 4].includes(fieldsNumber % 10))
        return "pytania"
      return "pytań"
    }

    this.fieldsNumberMessage =
      `w sumie ${this.currentPoll.fields.length} ${getQuestionKeyword(this.currentPoll.fields.length)}`
  }

  private validatePollInput(): string | null {
    const trimmed = this.newQuestionInputValue.trim()

    if (trimmed === "")
      return null
    return trimmed
  }

  private validateWholePoll(): "ok" | "no-questions" | "empty-poll-name" {
    if (this.currentPoll.fields.length === 0)
      return "no-questions"

    if (this.newPollName.trim() === "")
      return "empty-poll-name"

    return "ok"
  }
}
