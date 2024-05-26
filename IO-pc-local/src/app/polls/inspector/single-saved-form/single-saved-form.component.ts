import {Component, inject, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {FormId, SavedFormType} from "../../model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {SavedFormsService} from "../../saved-forms.service";

@Component({
  selector: 'app-single-saved-form',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatButton,
    RouterLink
  ],
  templateUrl: './single-saved-form.component.html',
  styleUrl: './single-saved-form.component.css'
})
export class SingleSavedFormComponent implements OnInit {
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
