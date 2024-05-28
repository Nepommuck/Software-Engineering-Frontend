import {Injectable} from '@angular/core';
import {FormField, FormFieldId, FormType} from "../model";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UnsavedFormService {
  private firstFreeFieldId = 0
  private currentForm: FormType = []

  private formChanges: Subject<FormType> = new Subject<FormType>();

  get form(): FormType {
    return [...this.currentForm]
  }

  get formChanges$(): Observable<FormType> {
    return this.formChanges.asObservable();
  }

  addField(question: string): void {
    const newField: FormField = {id: this.firstFreeFieldId, question}
    this.firstFreeFieldId++
    this.currentForm.push(newField)

    this.emitChange()
  }

  removeField(id: FormFieldId): void {
    this.currentForm = this.currentForm.filter(field => field.id !== id)
    this.emitChange()
  }

  // Returns `true` if operation was successful, `false` otherwise
  changeFieldOrder(fieldId: FormFieldId, direction: "up" | "down"): boolean {
    const fieldIndex = this.currentForm.findIndex(field => field.id === fieldId)

    // Field does not exist
    if (fieldIndex < 0)
      return false

    const secondFieldIndex = fieldIndex + (direction === "down" ? 1 : -1)

    // Operation out of scope
    if (secondFieldIndex < 0 || secondFieldIndex >= this.currentForm.length) {
      return false
    }

    [this.currentForm[fieldIndex], this.currentForm[secondFieldIndex]] =
      [this.currentForm[secondFieldIndex], this.currentForm[fieldIndex]]
    this.emitChange()

    return true
  }

  private emitChange(): void {
    this.formChanges.next([...this.currentForm]);
  }
}