import {Component, inject, OnInit} from '@angular/core';
import {UnsavedFormService} from "../unsaved-form.service";
import {FormsModule} from "@angular/forms";
import {FormFieldId, FormType} from "../../model";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-new-poll-creator',
  standalone: true,
  imports: [
    FormsModule,
    MatIcon,
    MatIconButton,
    MatButton
  ],
  templateUrl: './new-poll-creator.component.html',
  styleUrl: './new-poll-creator.component.css'
})
export class NewPollCreatorComponent implements OnInit {
  readonly unsavedFormService = inject(UnsavedFormService)

  protected currentForm: FormType = this.unsavedFormService.form
  protected newQuestionInputValue: string = ""

  protected fieldsNumberMessage: string = ""

  ngOnInit(): void {
    this.updateFieldsNumberMessage()

    this.unsavedFormService.formChanges$.subscribe(updatedForm => {
        this.currentForm = updatedForm
        this.updateFieldsNumberMessage()
      }
    )
  }

  protected addField(): void {
    const validationResult = this.validateFormInput()

    if (validationResult !== null) {
      this.unsavedFormService.addField(validationResult)
      this.newQuestionInputValue = ""
    }
  }

  protected removeField(fieldId: FormFieldId): void {
    this.unsavedFormService.removeField(fieldId)
  }

  protected moveFieldUp(fieldId: FormFieldId): void {
    this.unsavedFormService.changeFieldOrder(fieldId, "up")
  }

  protected moveFieldDown(fieldId: FormFieldId): void {
    this.unsavedFormService.changeFieldOrder(fieldId, "down")
  }

  private updateFieldsNumberMessage(): void {
    function getQuestionKeyword(fieldsNumber: number): string {
      if (fieldsNumber === 1)
        return "pytanie"
      if ((fieldsNumber < 10 || fieldsNumber > 20) && [2, 3, 4].includes(fieldsNumber % 10))
        return "pytania"
      return "pytań"
    }

    this.fieldsNumberMessage = `w sumie ${this.currentForm.length} ${getQuestionKeyword(this.currentForm.length)}`
  }

  private validateFormInput(): string | null {
    const trimmed = this.newQuestionInputValue.trim()

    if (trimmed === "")
      return null
    return trimmed
  }
}
