import {Routes} from '@angular/router';
import {NewPollCreatorComponent} from "./forms/creator/new-poll-creator/new-poll-creator.component";
import {HomeViewComponent} from "./home/home-view/home-view.component";
import {SavedFormsInspectorComponent} from "./forms/inspector/saved-forms-inspector/saved-forms-inspector.component";

export const RoutePaths = {
  Home: "",
  Forms: {
    New: "forms/new",
    Inspect: "forms",
  }
}

export const routes: Routes = [
  {path: RoutePaths.Home, component: HomeViewComponent},
  {path: RoutePaths.Forms.New, component: NewPollCreatorComponent},
  {path: RoutePaths.Forms.Inspect, component: SavedFormsInspectorComponent},
];
