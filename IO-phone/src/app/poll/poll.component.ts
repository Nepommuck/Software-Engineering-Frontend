import { Component, OnInit, inject } from '@angular/core';
import { PollService } from './poll.service';

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [],
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.css'
})
export class PollComponent implements OnInit {
  private pollService = inject(PollService);

  ngOnInit(): void {
    //TODO: fetch a poll template from server and store it
    // this.pollService.getPollTemplate(); 
  }
  

}
