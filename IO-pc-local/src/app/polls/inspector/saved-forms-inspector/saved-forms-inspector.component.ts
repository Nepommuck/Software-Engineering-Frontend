import {Component, inject} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {SavedFormsService} from "../../saved-forms.service";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-saved-forms-inspector',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatButton,
    RouterLink,
    MatTooltip
  ],
  templateUrl: './saved-forms-inspector.component.html',
  styleUrl: './saved-forms-inspector.component.css'
})
export class SavedFormsInspectorComponent {
  private savedFormService = inject(SavedFormsService)
  protected savedForms = this.savedFormService.allForms

  constructor() {
    this.savedFormService.formsChange$.subscribe(allForms => {
      this.savedForms = allForms
    })
  }

  protected removeForm(formId: number): void {
    this.savedFormService.removeForm(formId)
  }
}
