import { Component, OnInit } from '@angular/core';
import { FlightItem, FlightsService } from '../../services/flights.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-traveler',
  standalone: false,
  templateUrl: './traveler.component.html',
  styleUrl: './traveler.component.scss'
})
export class TravelerComponent implements OnInit{
  currentFlight: FlightItem | undefined
  months = [1,2,3,4,5,6,7,8,9,10,11,12]
  days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
  currentYear: number = new Date().getFullYear();
  years: number[] = Array.from({ length: 100 }, (_, i) => this.currentYear - i); 
  countries: string[] = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany']; 

  registrationForm: FormGroup | undefined;
  constructor (private flightService: FlightsService, private fb: FormBuilder){
    this.registrationForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        secondName: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        monthOfBirth: ['', [Validators.required]],
        dayOfBirth: ['', [Validators.required]],
        yearOfBirth: ['', [Validators.required]],
        citizenship: ['', [Validators.required]],
      },
    );
  }
  ngOnInit(): void {
    this.currentFlight = this.flightService.getFlight()
    const previousState = this.flightService.getFormState()
    if(previousState){
      this.registrationForm?.patchValue({
        firstName: previousState.firstName,
        secondName: previousState.secondName,
        gender: previousState.gender,
        monthOfBirth: previousState.monthOfBirth,
        dayOfBirth: previousState.dayOfBirth,
        yearOfBirth: previousState.yearOfBirth,
        citizenship: previousState.citizenship,
      })
    }
    this.registrationForm?.valueChanges.subscribe((state)=>{
      this.flightService.setFormState({
        firstName: this.registrationForm?.controls["firstName"].value || "",
        secondName: this.registrationForm?.controls["secondName"].value || "",
        gender: this.registrationForm?.controls["gender"].value || "",
        monthOfBirth: this.registrationForm?.controls["monthOfBirth"].value || 0,
        dayOfBirth: this.registrationForm?.controls["dayOfBirth"].value || 0,
        yearOfBirth: this.registrationForm?.controls["yearOfBirth"].value || 0,
        citizenship: this.registrationForm?.controls["citizenship"].value || "",

      })
    })
  }

  submitForm(){
    console.log(this.registrationForm?.value)
    alert(JSON.stringify(this.registrationForm?.value))
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
