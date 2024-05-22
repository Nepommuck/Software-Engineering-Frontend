import {Routes} from '@angular/router';
import {NewPollCreatorComponent} from "./forms/creator/new-poll-creator/new-poll-creator.component";
import {HomeViewComponent} from "./home/home-view/home-view.component";

export const routes: Routes = [
  {path: '', component: HomeViewComponent},
  {path: 'create', component: NewPollCreatorComponent}
];
