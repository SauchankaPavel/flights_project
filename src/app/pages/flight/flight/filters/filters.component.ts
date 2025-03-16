import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-filters',
  standalone: false,

  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent implements OnInit, OnDestroy{
  sortingValues: string[] = ["Price (Lowest)", "Price (Highest)"]
  priceRangeStart = 0;
  priceRangeEnd = 4400;
  checkboxOptions = [
    { value: 0, label: 'All stops' },
    { value: 1, label: 'Nonstop' },
    { value: 2, label: '1 stop' },
    { value: 3, label: '2 stops' }
  ];
  filterForm = new FormGroup({
    sorting: new FormControl('Price (Lowest)'),
    priceRangeStart: new FormControl(this.priceRangeStart),
    priceRangeEnd: new FormControl(this.priceRangeEnd),
    stops: new FormControl(0)
  });
  @Output() filterFormChange = new EventEmitter<FilterFormState>();
  private destroy$ = new Subject<void>();

  constructor(){

  }
   
  ngOnInit(): void {
    this.filterForm.valueChanges.pipe(
      debounceTime(500),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const { sorting, priceRangeStart, priceRangeEnd, stops } = this.filterForm.value;
      this.filterFormChange.emit({
        sorting: sorting || "Price (Lowest)",
        priceRangeStart: priceRangeStart ?? this.priceRangeStart,
        priceRangeEnd: priceRangeEnd ?? this.priceRangeEnd,
        stops: stops ?? 0,
      });
    });
  }

  isStopSelected(value: number): boolean {
    return this.filterForm.get('stops')?.value === value;
  }

  // Method to handle checkbox change
  onStopSelect(value: number): void {
    this.filterForm.get('stops')?.setValue(value);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

export type FilterFormState = {
  sorting: string,
  priceRangeStart: number,
  priceRangeEnd: number,
  stops: number
}
