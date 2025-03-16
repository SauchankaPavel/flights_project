import { Component, Input, input } from '@angular/core';
import { FlightItem } from '../../../../services/flights.service';

@Component({
  selector: 'app-flight-card',
  standalone: false,
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.scss'
})
export class FlightCardComponent {

  @Input() flightItem: FlightItem | undefined

}
