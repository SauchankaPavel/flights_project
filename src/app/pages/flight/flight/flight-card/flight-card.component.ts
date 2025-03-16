import { Component, Input, input } from '@angular/core';
import { FlightItem, FlightsService } from '../../../../services/flights.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-card',
  standalone: false,
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.scss'
})
export class FlightCardComponent {
  constructor(private flightService: FlightsService, private router: Router){

  }
  @Input() flightItem: FlightItem | undefined
  bookFlight(flight: FlightItem| undefined){
    if(flight){
      this.flightService.setFlight(flight);
      this.router.navigate(['/traveler']);
    }
  
  }
}
