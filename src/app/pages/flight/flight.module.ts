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
import { FlightsService } from '../../services/flights.service';
import { FlightCardComponent } from './flight/flight-card/flight-card.component';
import { MatButtonModule } from '@angular/material/button';
import { TimeFormatPipe } from './flight/flight-card/timeFormat.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FlightComponent,
    FlightListComponent,
    FiltersComponent, 
    FlightCardComponent,
    TimeFormatPipe
  ],
  imports: [
    CommonModule,
    FlightRoutingModule,
    MatInputModule,
    MatSelect,
    MatOption,
    MatSliderModule,
    MatCheckbox,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ], 
})
export class FlightModule { }
