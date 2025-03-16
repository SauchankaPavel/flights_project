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
  pageSize: number = 5;
  pageIndex: number = 0;
  formValue: FilterFormState | undefined
  constructor(private flightService: FlightsService){

  }

  ngOnInit(): void {
    this.flightService.getFlights(this.pageSize, this.pageIndex).subscribe((res)=>{
      this.currentflightItems = res
    })
  }

  filterFormChangeHandler(formValue: FilterFormState){
    this.pageSize = 5
    this.formValue = formValue
    this.flightService.getFlights(this.pageSize, this.pageIndex, formValue).subscribe((res)=>{
      this.currentflightItems = res
    })
  }

  showMoreHandler(){
    this.pageSize += 5
    this.flightService.getFlights(this.pageSize, this.pageIndex, this.formValue).subscribe((res)=>{
      this.currentflightItems = res
    })
  }
}


