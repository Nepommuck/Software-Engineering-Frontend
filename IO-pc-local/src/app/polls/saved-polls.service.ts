import {Injectable} from '@angular/core';
import {Poll, PollId, SavedPoll} from "./model";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SavedPollsService {
  private currentPolls: SavedPoll[] = [
    // {
    //   id: 15,
    //   name: "Gdzie tyś jest?",
    //   fields: [
    //     {id: 2, question: "eee"}
    //   ]
    // },
    // {
    //   id: 19,
    //   name: "Eeeeeee",
    //   fields: [
    //     {id: 11, question: "eee"},
    //     {id: 12, question: "eeefff"},
    //   ]
    // },
  ]
  private firstFreeId = 0
  private pollsChanged = new Subject<SavedPoll[]>();

  get allPolls(): SavedPoll[] {
    return [...this.currentPolls]
  }

  get pollsChange$(): Observable<SavedPoll[]> {
    return this.pollsChanged.asObservable();
  }

  getPollById(id: PollId): SavedPoll | undefined {
    return this.currentPolls.find(poll => poll.id === id)
  }

  addPoll(newPoll: Poll): void {
    this.currentPolls.push({
      id: this.firstFreeId,
      ...newPoll,
    })
    this.firstFreeId++
    this.emitChange()
  }

  updateExistingPoll(pollId: PollId, newValue: Poll): void {
    this.currentPolls = this.currentPolls.map(poll => {
      if (poll.id !== pollId) {
        return poll
      } else {
        return {id: pollId, ...newValue}
      }
    })
    this.emitChange()
  }

  removePoll(pollId: PollId): void {
    this.currentPolls = this.currentPolls.filter(poll =>
      poll.id !== pollId
    )
    this.emitChange()
  }

  private emitChange(): void {
    this.pollsChanged.next([...this.currentPolls]);
  }
}
