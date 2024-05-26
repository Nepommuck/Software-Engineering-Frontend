import {Routes} from '@angular/router';
import {NewPollCreatorComponent} from "./forms/creator/new-poll-creator/new-poll-creator.component";
import {HomeViewComponent} from "./home/home-view/home-view.component";
import { LobbyComponent } from './lobby/lobby.component';
import { ProgressDisplayComponent } from './progress-display/progress-display.component';

export const routes: Routes = [
  {path: '', component: HomeViewComponent},
  {path: 'create', component: NewPollCreatorComponent},
  {path: 'lobby', component: LobbyComponent},
  {path: 'progress', component: ProgressDisplayComponent}
];
