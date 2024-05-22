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
  protected mewQuestionInputValue: string = ""

  protected fieldsNumberMessage: string = ""

  ngOnInit(): void {
    this.updateFieldsNumberMessage()
  }

  protected addField(): void {
    const validationResult = this.validateFormInput()

    if (validationResult !== null) {
      this.unsavedFormService.addField(validationResult)
      this.mewQuestionInputValue = ""
      this.updateForm()
    }
  }

  protected removeField(fieldId: FormFieldId): void {
    this.unsavedFormService.removeField(fieldId)
    this.updateForm()
  }

  protected moveFieldUp(fieldId: FormFieldId): void {
    this.unsavedFormService.changeFieldOrder(fieldId, "up")
    this.updateForm()
  }

  protected moveFieldDown(fieldId: FormFieldId): void {
    this.unsavedFormService.changeFieldOrder(fieldId, "down")
    this.updateForm()
  }

  private updateForm() {
    this.currentForm = this.unsavedFormService.form
    this.updateFieldsNumberMessage()
  }

  private updateFieldsNumberMessage(): void {
    function getQuestionKeyword(fieldsNumber: number): string {
      if (fieldsNumber == 1)
        return "pytanie"
      if ((fieldsNumber < 10 || fieldsNumber > 20) && [2, 3].includes(fieldsNumber % 10))
        return "pytania"
      return "pytań"
    }

    this.fieldsNumberMessage = `w sumie ${this.currentForm.length} ${getQuestionKeyword(this.currentForm.length)}`
  }

  private validateFormInput(): string | null {
    const trimmed = this.mewQuestionInputValue.trim()

    if (trimmed === "")
      return null
    return trimmed
  }
}
