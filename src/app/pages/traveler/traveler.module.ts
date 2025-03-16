import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravelerRoutingModule } from './traveler-routing.module';
import { TravelerComponent } from './traveler.component';


@NgModule({
  declarations: [
    TravelerComponent
  ],
  imports: [
    CommonModule,
    TravelerRoutingModule
  ]
})
export class TravelerModule { }
