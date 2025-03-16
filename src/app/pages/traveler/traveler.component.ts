import { Component, OnDestroy, OnInit } from '@angular/core';
import { FlightItem, FlightsService } from '../../services/flights.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-traveler',
  standalone: false,
  templateUrl: './traveler.component.html',
  styleUrl: './traveler.component.scss'
})
export class TravelerComponent implements OnInit, OnDestroy{
  currentFlight: FlightItem | undefined
  months = [1,2,3,4,5,6,7,8,9,10,11,12]
  days = Array.from({ length: 30 }, (_, i) => i + 1);
  currentYear: number = new Date().getFullYear();
  years: number[] = Array.from({ length: 100 }, (_, i) => this.currentYear - i); 
  countries: string[] = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany']; 

  registrationForm: FormGroup;
  private destroy$ = new Subject<void>();

  constructor (public flightService: FlightsService, private fb: FormBuilder){
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      secondName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      monthOfBirth: ['', [Validators.required]],
      dayOfBirth: ['', [Validators.required]],
      yearOfBirth: ['', [Validators.required]],
      citizenship: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.currentFlight = this.flightService.getFlight();
    const previousState = this.flightService.getFormState();

    if (previousState) {
      this.registrationForm.patchValue(previousState);
    }

    this.registrationForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((state) => {
      this.flightService.setFormState(state);
    });
  }

  submitForm(){
    console.log(this.registrationForm?.value)
    console.log(this.currentFlight?.id)
    alert(JSON.stringify(this.registrationForm?.value))
    alert(JSON.stringify(this.currentFlight?.id))
  }

  goBack(): void {
    window.history.back();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

export type FormState = {
  firstName: string,
        secondName: string,
        gender: string,
        monthOfBirth: number,
        dayOfBirth: number,
        yearOfBirth: number,
        citizenship: string,
}
