import {Component, inject, input, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {FormFieldId, FormType, SavedFormType} from "../model";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatRow} from "@angular/material/table";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router, RouterLink} from "@angular/router";
import {SavedFormsService} from "../saved-forms.service";
import {UnsavedFormService} from "../unsaved-form.service";
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
  formToEdit = input<SavedFormType>()
  protected newQuestionInputValue: string = ""
  protected fieldsNumberMessage = ""
  protected newFormName = ""
  private readonly unsavedFormService = inject(UnsavedFormService)
  protected currentForm: FormType = this.unsavedFormService.form
  private readonly savedFormsService = inject(SavedFormsService)
  private readonly router = inject(Router)
  private readonly snackBar = inject(MatSnackBar)

  ngOnInit(): void {
    const formToEdit = this.formToEdit()
    if (formToEdit) {
      this.unsavedFormService.load(formToEdit)
      this.newFormName = formToEdit.name
      this.currentForm = formToEdit
    }

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

  protected saveFormHandler(): void {
    this.currentForm = {
      ...this.currentForm,
      name: this.newFormName,
    }

    const validationResult = this.validateWholeForm()
    if (validationResult == "no-questions") {
      this.snackBar.open("Aby zapisać ankietę, musisz stworzyć chociaż jedno pytanie", "OK")
    } else if (validationResult == "empty-form-name") {
      this.snackBar.open("Aby zapisać ankietę, musisz nadać jej tytuł", "OK")
    } else if (validationResult == "ok") {
      const formToEdit = this.formToEdit()
      if (formToEdit) {
        this.savedFormsService.updateExistingForm(formToEdit.id, this.currentForm)
      } else {
        this.savedFormsService.addForm(this.currentForm)
      }
      this.unsavedFormService.restart()

      // TODO It fails with 'NG04014: Invalid configuration of route 'forms/new'. One of the following must be
      //  provided: component, loadComponent, redirectTo, children or loadChildren'. I don't understand why
      // this.router.navigate([RoutePaths.Forms.All])

      this.router.navigate(["forms"])
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
      `w sumie ${this.currentForm.fields.length} ${getQuestionKeyword(this.currentForm.fields.length)}`
  }

  private validateFormInput(): string | null {
    const trimmed = this.newQuestionInputValue.trim()

    if (trimmed === "")
      return null
    return trimmed
  }

  private validateWholeForm(): "ok" | "no-questions" | "empty-form-name" {
    if (this.currentForm.fields.length === 0)
      return "no-questions"

    if (this.newFormName.trim() === "")
      return "empty-form-name"

    return "ok"
  }
}
