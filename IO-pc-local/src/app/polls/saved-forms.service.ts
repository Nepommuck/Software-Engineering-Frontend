import {Injectable} from '@angular/core';
import {FormId, FormType, SavedFormType} from "./model";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SavedFormsService {
  private currentForms: SavedFormType[] = [
    {
      id: 15,
      name: "Gdzie tyś jest?",
      fields: [
        {id: 2, question: "eee"}
      ]
    },
    {
      id: 19,
      name: "Eeeeeee",
      fields: [
        {id: 11, question: "eee"},
        {id: 12, question: "eeefff"},
      ]
    },
  ]
  private firstFreeId = 0
  private formsChanged = new Subject<SavedFormType[]>();

  get allForms(): SavedFormType[] {
    return [...this.currentForms]
  }

  get formsChange$(): Observable<SavedFormType[]> {
    return this.formsChanged.asObservable();
  }

  getFormById(id: FormId): SavedFormType | undefined {
    return this.currentForms.find(form => form.id === id)
  }

  addForm(newForm: FormType): void {
    this.currentForms.push({
      id: this.firstFreeId,
      ...newForm,
    })
    this.firstFreeId++
    this.emitChange()
  }

  updateExistingForm(formId: FormId, newValue: FormType): void {
    this.currentForms = this.currentForms.map(form => {
      if (form.id !== formId) {
        return form
      } else {
        return {id: formId, ...newValue}
      }
    })
    this.emitChange()
  }

  removeForm(formId: FormId): void {
    this.currentForms = this.currentForms.filter(form =>
      form.id !== formId
    )
    this.emitChange()
  }

  private emitChange(): void {
    this.formsChanged.next([...this.currentForms]);
  }
}
