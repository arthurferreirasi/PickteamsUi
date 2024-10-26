import { Routes } from '@angular/router';
import { PickTeamsComponent } from './pick-teams/pick-teams.component';

export const routes: Routes = [
    {path: '', redirectTo: 'pick-teams', pathMatch: 'full'},
    { path: 'pick-teams', component: PickTeamsComponent }
];
