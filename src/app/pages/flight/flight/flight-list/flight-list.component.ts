import { Component, Input } from '@angular/core';
import { FlightItem } from '../../../../services/flights.service';

@Component({
  selector: 'app-flight-list',
  standalone: false,
  templateUrl: './flight-list.component.html',
  styleUrl: './flight-list.component.scss'
})
export class FlightListComponent {
  @Input() flightItems: FlightItem[] = []
}
