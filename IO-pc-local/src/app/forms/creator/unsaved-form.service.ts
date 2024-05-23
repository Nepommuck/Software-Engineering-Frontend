import {Injectable} from '@angular/core';
import {FormField, FormFieldId, FormType} from "../model";

@Injectable({
  providedIn: 'root'
})
export class UnsavedFormService {
  private firstFreeFieldId = 0
  private currentForm: FormType = {name: "", fields: []}

  get form(): FormType {
    return {...this.currentForm}
  }

  addField(question: string): void {
    const newField: FormField = {id: this.firstFreeFieldId, question}
    this.firstFreeFieldId++
    this.currentForm.fields.push(newField)
  }

  removeField(id: FormFieldId): void {
    this.currentForm = {
      ...this.currentForm,
      fields: this.currentForm.fields.filter(field => field.id !== id),
    }
  }

  // Returns `true` if operation was successful, `false` otherwise
  changeFieldOrder(fieldId: FormFieldId, direction: "up" | "down"): boolean {
    const fieldIndex = this.currentForm.fields.findIndex(field => field.id === fieldId)

    // Field does not exist
    if (fieldIndex < 0)
      return false

    const secondFieldIndex = fieldIndex + (direction === "down" ? 1 : -1)

    // Operation out of scope
    if (secondFieldIndex < 0 || secondFieldIndex >= this.currentForm.fields.length)
      return false

    console.log(fieldIndex, secondFieldIndex)
    const fieldToSwap = this.currentForm.fields[fieldIndex]
    this.currentForm.fields[fieldIndex] = this.currentForm.fields[secondFieldIndex]
    this.currentForm.fields[secondFieldIndex] = fieldToSwap

    return true
  }
}
