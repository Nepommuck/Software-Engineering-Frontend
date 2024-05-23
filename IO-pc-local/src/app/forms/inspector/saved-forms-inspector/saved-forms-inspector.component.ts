import {Component, inject} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {SavedFormsService} from "../saved-forms.service";

@Component({
  selector: 'app-saved-forms-inspector',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatButton
  ],
  templateUrl: './saved-forms-inspector.component.html',
  styleUrl: './saved-forms-inspector.component.css'
})
export class SavedFormsInspectorComponent {
  private savedFormService = inject(SavedFormsService)
  protected savedForms = this.savedFormService.forms
}
