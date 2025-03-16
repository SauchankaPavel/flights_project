import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravelerRoutingModule } from './traveler-routing.module';
import { TravelerComponent } from './traveler.component';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
    TravelerComponent
  ],
  imports: [
    CommonModule,
    TravelerRoutingModule,
    MatInputModule,
    MatSelect,
    MatOption,
    MatSliderModule,
    MatCheckbox,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule
  ]
})
export class TravelerModule { }
