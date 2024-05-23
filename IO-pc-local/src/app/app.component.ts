import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NewPollCreatorComponent} from "./forms/creator/new-poll-creator/new-poll-creator.component";
import {MatButton} from "@angular/material/button";
import {NavBarComponent} from "./nav/nav-bar/nav-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NewPollCreatorComponent, MatButton, RouterLink, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'IO-pc-local';
}
