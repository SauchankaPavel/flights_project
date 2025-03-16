import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { FilterFormState } from "../pages/flight/flight/filters/filters.component";
import { FormState } from "../pages/traveler/traveler.component";

@Injectable({providedIn: 
    "root"
})

export class FlightsService {
    baseUrl: string = "https://public-front-bucket.s3.eu-central-1.amazonaws.com/test/test_flights.json"
    private selectedFlight: FlightItem | undefined;
    private formState: FormState | undefined
    constructor(private http: HttpClient){
  
    }
    getFlights(formValue?: FilterFormState): Observable<FlightItem[]>{
        return this.http.get<FlightItem[]>(this.baseUrl).pipe(
            map((res: FlightItem[]) => {
              let mappedResult = res.map(
                (result) => {
                  return {
                    flights: result.flights,
                    id: result.id,
                    price: result.price,
                    totalStops: result.flights.reduce((total, flight) => total + flight.stops, 0)
                  };
                }
              );
              //filter by price range
              if(formValue?.priceRangeEnd){
                mappedResult =  mappedResult.filter(item => item.price >= formValue?.priceRangeStart && item.price <= formValue.priceRangeEnd);
                
              }
              //filter by stops
              if(formValue?.stops&&formValue?.stops>0){
                mappedResult = mappedResult.filter(item => item.totalStops === formValue.stops-1);
              }
              //sort
              if (formValue?.sorting){
                if(formValue.sorting==="Price (Lowest)"){
                  mappedResult.sort((a, b) => a.price - b.price);
                }else if(formValue.sorting==="Price (Highest)"){
                  mappedResult.sort((a, b) => b.price - a.price);
                }
              }
              return mappedResult
            })
        )
        .pipe(map((data) => data.slice(0, 5)));
    }

    setFlight(flight: FlightItem) {
      this.selectedFlight = flight;
    }
  
    getFlight(): FlightItem | undefined {
      return this.selectedFlight;
    }

    setFormState(formState: FormState) {
      this.formState = formState;
    }
  
    getFormState(): FormState | undefined {
      return this.formState;
    }
}

export type FlightItem = {
    flights: Flight[];
    id: number;
    price: number
    totalStops: number
  }
  
  export type Flight = {
    airline: string;
    arrival_airport: string;
    arrival_date: string;
    arrival_time: string;
    departure_airport: string;
    departure_date: string;
    departure_time: string
    duration_minutes: number
    stops: number
  }