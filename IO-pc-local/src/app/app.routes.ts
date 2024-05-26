import {Routes} from '@angular/router';
import {HomeViewComponent} from "./home/home-view/home-view.component";
import {SavedFormsInspectorComponent} from "./polls/inspector/saved-forms-inspector/saved-forms-inspector.component";
import {SingleSavedFormComponent} from "./polls/inspector/single-saved-form/single-saved-form.component";
import {PollEditorComponent} from "./polls/editor/poll-editor.component";
import {ExistingPollEditorComponent} from "./polls/editor/existing-poll-editor/existing-poll-editor.component";

export const RoutePaths = {
  Home: "",
  Forms: {
    All: "forms",
    New: "forms/new",
    Edit: "forms/edit/:id",
    InspectSingleForm: "forms/:id",
  }
}

export const routes: Routes = [
  {path: RoutePaths.Home, component: HomeViewComponent},
  {path: RoutePaths.Forms.New, component: PollEditorComponent},
  {path: RoutePaths.Forms.All, component: SavedFormsInspectorComponent},
  {path: RoutePaths.Forms.InspectSingleForm, component: SingleSavedFormComponent},
  {path: RoutePaths.Forms.Edit, component: ExistingPollEditorComponent},
];
