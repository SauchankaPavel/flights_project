import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightRoutingModule } from './flight-routing.module';
import { FlightComponent } from './flight.component';
import { MatInputModule } from '@angular/material/input';
import { FlightListComponent } from './flight/flight-list/flight-list.component';
import { FiltersComponent } from './flight/filters/filters.component';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckbox } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    FlightComponent,
    FlightListComponent,
    FiltersComponent
  ],
  imports: [
    CommonModule,
    FlightRoutingModule,
    MatInputModule,
    MatSelect,
    MatOption,
    MatSliderModule,
    MatCheckbox
  ]
})
export class FlightModule { }
