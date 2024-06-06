import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { PollComponent } from './poll/poll.component';
export const routes: Routes = [
    {path: "", component: RegisterComponent, pathMatch: "full"},
    {path: "poll", component: PollComponent}
];
