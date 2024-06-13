import {Injectable,inject} from '@angular/core';
import {Poll, PollId, SavedPoll} from "./model";
import {Observable, Subject} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../config';

@Injectable({
  providedIn: 'root'
})
export class SavedPollsService {

  private httpClient = inject(HttpClient);

  private currentPolls: SavedPoll[] = [];

  private pollsChanged = new Subject<SavedPoll[]>();

  constructor(){
    this.httpClient.get<SavedPoll[]>(`${API_URL}/polls`).subscribe(value => {this.currentPolls = value})
  }

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
    this.httpClient.post<any>(`${API_URL}/poll/${newPoll.name}/save`,newPoll).subscribe(response => {})
    this.emitChange()
  }

  updateExistingPoll(pollId: PollId, newValue: Poll): void {
    this.httpClient.delete<any>(`${API_URL}/poll/${newValue.name}`)
    this.addPoll(newValue)
    this.emitChange()
  }

  removePoll(poll: Poll): void {
    this.httpClient.delete<any>(`${API_URL}/poll/${poll.name}`)
    this.emitChange()
  }

  private emitChange(): void {
    this.httpClient.get<SavedPoll[]>(`${API_URL}/polls`).subscribe(value => {this.currentPolls = value})
    //this.pollsChanged.next([...this.currentPolls]);
  }
}
