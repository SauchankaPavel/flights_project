import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'flight', loadChildren: () => import('./pages/flight/flight.module').then(m => m.FlightModule) },
    { path: 'traveler', loadChildren: () => import('./pages/traveler/traveler.module').then(m => m.TravelerModule) },
    { path: '', redirectTo: 'flight', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }