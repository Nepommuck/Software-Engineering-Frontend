import {Injectable} from '@angular/core';
import {FormField, FormFieldId, FormType} from "../model";

@Injectable({
  providedIn: 'root'
})
export class UnsavedFormService {
  private firstFreeFieldId = 0
  private currentForm: FormType = [
    {id: -5, question: "Kim ty w ogóle jesteś człowieku?"},
    {id: -4, question: "Dumny ty z siebie jesteś człowieku?"},
    {id: -3, question: "Wiesz kogo ty obrażasz?"},
  ]

  // private currentForm: FormType = []

  get form(): FormType {
    return [...this.currentForm]
  }

  addField(question: string): void {
    const newField: FormField = {id: this.firstFreeFieldId, question}
    this.firstFreeFieldId++
    this.currentForm.push(newField)
  }

  removeField(id: FormFieldId): void {
    this.currentForm = this.currentForm.filter(field => field.id !== id)
  }

  // Returns `true` if operation was successful, `false` otherwise
  changeFieldOrder(fieldId: FormFieldId, direction: "up" | "down"): boolean {
    const fieldIndex = this.currentForm.findIndex(field => field.id == fieldId)

    // Field does not exist
    if (fieldIndex < 0)
      return false

    const secondFieldIndex = fieldIndex + (direction == "down" ? 1 : -1)

    // Operation out of scope
    if (secondFieldIndex < 0 || secondFieldIndex >= this.currentForm.length)
      return false

    console.log(fieldIndex, secondFieldIndex)
    const fieldToSwap = this.currentForm[fieldIndex]
    this.currentForm[fieldIndex] = this.currentForm[secondFieldIndex]
    this.currentForm[secondFieldIndex] = fieldToSwap

    return true
  }
}
