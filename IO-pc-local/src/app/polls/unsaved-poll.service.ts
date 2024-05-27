import {Injectable} from '@angular/core';
import {Poll, PollField, PollFieldId} from "./model";
import {Observable, Subject} from "rxjs";

const EmptyPoll: Poll = {name: "", fields: []}

@Injectable({
  providedIn: 'root'
})
export class UnsavedPollService {
  private firstFreeFieldId = 0
  private currentPoll: Poll = EmptyPoll

  private pollChanges = new Subject<Poll>();

  get poll(): Poll {
    return {...this.currentPoll}
  }

  get pollChanges$(): Observable<Poll> {
    return this.pollChanges.asObservable();
  }

  addField(question: string): void {
    const newField: PollField = {id: this.firstFreeFieldId, question}
    this.firstFreeFieldId++

    this.currentPoll = {
      ...this.currentPoll,
      fields: this.currentPoll.fields.concat(newField)
    }
    this.emitChange()
  }

  removeField(id: PollFieldId): void {
    this.currentPoll = {
      ...this.currentPoll,
      fields: [...this.currentPoll.fields].filter(field => field.id !== id),
    }
    this.emitChange()
  }

  // Returns `true` if operation was successful, `false` otherwise
  changeFieldOrder(fieldId: PollFieldId, direction: "up" | "down"): boolean {
    const fieldIndex = this.currentPoll.fields.findIndex(field => field.id === fieldId)

    // Field does not exist
    if (fieldIndex < 0)
      return false

    const secondFieldIndex = fieldIndex + (direction === "down" ? 1 : -1)

    // Operation out of scope
    if (secondFieldIndex < 0 || secondFieldIndex >= this.currentPoll.fields.length) {
      return false
    }

    const pollFields = [...this.currentPoll.fields];
    [pollFields[fieldIndex], pollFields[secondFieldIndex]] =
      [pollFields[secondFieldIndex], pollFields[fieldIndex]]

    this.currentPoll = {...this.currentPoll, fields: pollFields}
    this.emitChange()

    return true
  }

  load(poll: Poll): void {
    this.currentPoll = poll
    this.emitChange()
  }

  restart(): void {
    this.currentPoll = EmptyPoll
    this.emitChange()
  }

  updateName(newPollName: string) {
    this.currentPoll = {...this.currentPoll, name: newPollName}
    this.emitChange()
  }

  private emitChange(): void {
    this.pollChanges.next({...this.currentPoll});
  }
}
