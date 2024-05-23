import { Injectable } from '@angular/core';
import {FormType, SavedFormType} from "../model";

@Injectable({
  providedIn: 'root'
})
export class SavedFormsService {
  private currentForms: SavedFormType[] = [
    {
      id: -1,
      name: "Gdzie tyś jest?",
      fields: [
        {id: 2, question: "eee"}
      ]
    }
  ]
  private firstFreeId = 0

  get forms(): SavedFormType[] {
    return this.currentForms
  }

  addForm(newForm: FormType): void {
    this.currentForms.push({
      id: this.firstFreeId,
      ...newForm,
    })
    this.firstFreeId++
  }
}
