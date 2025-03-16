import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { FilterFormState } from "../pages/flight/flight/filters/filters.component";
import { FormState } from "../pages/traveler/traveler.component";

@Injectable({providedIn: 
    "root"
})

export class FlightsService {
  private baseUrl: string = 'https://public-front-bucket.s3.eu-central-1.amazonaws.com/test/test_flights.json';
  private selectedFlight: FlightItem | undefined;
  private formState: FormState | undefined;
  totalCountOfItems = 0;

  constructor(private http: HttpClient) {}

  getFlights(
    pageSize: number,
    pageIndex: number,
    formValue?: FilterFormState
  ): Observable<FlightItem[]> {
    return this.http.get<FlightItem[]>(this.baseUrl).pipe(
      map((res: FlightItem[]) => {
        let mappedResult = res.map((result) => ({
          flights: result.flights,
          id: result.id,
          price: result.price,
          totalStops: result.flights.reduce((total, flight) => total + flight.stops, 0),
        }));

        // Apply filters based on form values
        if (formValue) {
          if (formValue.priceRangeEnd) {
            mappedResult = mappedResult.filter(
              (item) => item.price >= formValue.priceRangeStart && item.price <= formValue.priceRangeEnd
            );
          }

          if (formValue.stops && formValue.stops > 0) {
            mappedResult = mappedResult.filter((item) => item.totalStops === formValue.stops - 1);
          }

          if (formValue.sorting) {
            if (formValue.sorting === 'Price (Lowest)') {
              mappedResult.sort((a, b) => a.price - b.price);
            } else if (formValue.sorting === 'Price (Highest)') {
              mappedResult.sort((a, b) => b.price - a.price);
            }
          }
        }

        this.totalCountOfItems = mappedResult.length;
        const startIndex = pageIndex * pageSize;
        const endIndex = startIndex + pageSize;
        return mappedResult.slice(startIndex, endIndex);
      })
    );
  }

  setFlight(flight: FlightItem): void {
    this.selectedFlight = flight;
  }

  getFlight(): FlightItem | undefined {
    return this.selectedFlight;
  }

  setFormState(formState: FormState): void {
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