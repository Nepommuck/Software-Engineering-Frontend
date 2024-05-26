import {Component, inject, OnInit} from '@angular/core';
import {SavedFormsService} from "../../saved-forms.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormId, SavedFormType} from "../../model";
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
  protected form?: SavedFormType
  private savedFormsService = inject(SavedFormsService)
  private activatedRoute = inject(ActivatedRoute)
  private router = inject(Router)
  private formId!: FormId

  ngOnInit(): void {
    const formIdParam = this.activatedRoute.snapshot.paramMap.get("id")

    if (formIdParam) {
      this.formId = Number(formIdParam)
      this.form = this.savedFormsService.getFormById(this.formId)
    }

    if (!this.form) {
      console.error(`Failed to get form with id: ${this.formId}`)
      this.router.navigate([".."])
    }
  }
}
