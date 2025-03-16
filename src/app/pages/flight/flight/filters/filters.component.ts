import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-filters',
  standalone: false,

  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent implements OnInit{
  sortingValues: string[] = ["Price (Lowest)", "Price (Highest)"]
  priceRangeStart = 0;
  priceRangeEnd = 4400;
  filterForm = new FormGroup({
    sorting: new FormControl('Price (Lowest)'),
    priceRangeStart: new FormControl(this.priceRangeStart),
    priceRangeEnd: new FormControl(this.priceRangeEnd)

  });
  @Output() filterFormChange = new EventEmitter<FilterFormState>();
  constructor(){

  }
   
  ngOnInit(): void {
    this.filterForm.valueChanges.pipe(
      debounceTime(500)
    ).subscribe((res)=>{
      console.log(res)
      this.filterFormChange.emit({
        sorting: this.filterForm.controls['sorting'].value || "",
        priceRangeStart: this.filterForm.controls['priceRangeStart'].value || this.priceRangeStart,
        priceRangeEnd: this.filterForm.controls['priceRangeEnd'].value || this.priceRangeEnd,

      })
    })
  }
}

export type FilterFormState = {
  sorting: string,
  priceRangeStart: number,
  priceRangeEnd: number
}
