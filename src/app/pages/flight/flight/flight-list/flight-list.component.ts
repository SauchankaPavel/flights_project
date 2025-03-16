import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FlightItem, FlightsService } from '../../../../services/flights.service';

@Component({
  selector: 'app-flight-list',
  standalone: false,
  templateUrl: './flight-list.component.html',
  styleUrl: './flight-list.component.scss'
})
export class FlightListComponent {
  @Input() flightItems: FlightItem[] = []
  @Input() pageSize: number = 0

  @Output() showMoreEmitter = new EventEmitter();
  constructor(public flightService: FlightsService){

  }
  showMore(){
    this.showMoreEmitter.emit()
  }
}
