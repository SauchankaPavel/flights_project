import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FlightItem, FlightsService } from '../../services/flights.service';
import { FilterFormState } from './flight/filters/filters.component';

@Component({
  selector: 'app-flight',
  standalone: false,
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.scss'
})
export class FlightComponent implements OnInit{
  currentflightItems: FlightItem[] = []

  constructor(private flightService: FlightsService){

  }

  ngOnInit(): void {
    this.flightService.getFlights().subscribe((res)=>{
      console.log(res)
      this.currentflightItems = res
    })
  }

  filterFormChangeHandler(formValue: FilterFormState){
    console.log(formValue)
    this.flightService.getFlights(formValue).subscribe((res)=>{
      console.log(res)
      this.currentflightItems = res
    })
  }
}


