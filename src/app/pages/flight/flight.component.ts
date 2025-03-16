import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FlightItem, FlightsService } from '../../services/flights.service';
import { FilterFormState } from './flight/filters/filters.component';
import { BehaviorSubject, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-flight',
  standalone: false,
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.scss'
})
export class FlightComponent implements OnInit, OnDestroy{
  currentflightItems: FlightItem[] = []
  pageSize: number = 5;
  pageIndex: number = 0;
  formValue: FilterFormState | undefined

  private destroy$ = new Subject<void>();
  private flightParams$ = new BehaviorSubject<{ pageSize: number; pageIndex: number; formValue?: FilterFormState }>({
    pageSize: this.pageSize,
    pageIndex: this.pageIndex
  });
  constructor(private flightService: FlightsService){

  }

  ngOnInit(): void {
    this.flightParams$
      .pipe(
        switchMap(params => this.flightService.getFlights(params.pageSize, params.pageIndex, params.formValue)),
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        this.currentflightItems = res;
      });
  }

  filterFormChangeHandler(formValue: FilterFormState){
    this.formValue = formValue;
    this.flightParams$.next({ pageSize: 5, pageIndex: this.pageIndex, formValue });
  }

  showMoreHandler(){
    this.pageSize += 5;
    this.flightParams$.next({ pageSize: this.pageSize, pageIndex: this.pageIndex, formValue: this.formValue });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}


