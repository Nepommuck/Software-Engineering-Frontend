import {Routes} from '@angular/router';
import {HomeViewComponent} from "./home/home-view/home-view.component";

import {SavedPollsListComponent} from "./polls/inspector/saved-polls-list/saved-polls-list.component";
import {SinglePollInspectorComponent} from "./polls/inspector/single-poll-inspector/single-poll-inspector.component";
import {PollEditorComponent} from "./polls/editor/poll-editor.component";
import {ExistingPollEditorComponent} from "./polls/editor/existing-poll-editor/existing-poll-editor.component";
import { LobbyComponent } from './lobby/lobby.component';

export const RoutePaths = {
  Home: "",
  Polls: {
    All: "polls",
    New: "polls/new",
    Edit: "polls/edit/:id",
    InspectSinglePoll: "polls/:id",
  },
  Lobby: "lobby"
}

export const routes: Routes = [
  {path: RoutePaths.Home, component: HomeViewComponent},
  {path: RoutePaths.Polls.New, component: PollEditorComponent},
  {path: RoutePaths.Polls.All, component: SavedPollsListComponent},
  {path: RoutePaths.Polls.InspectSinglePoll, component: SinglePollInspectorComponent},
  {path: RoutePaths.Polls.Edit, component: ExistingPollEditorComponent},
  {path: RoutePaths.Lobby, component: LobbyComponent}
];
