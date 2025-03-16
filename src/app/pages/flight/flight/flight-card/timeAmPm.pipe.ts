import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAmPm',
  standalone: false
})
export class TimeAmPmPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    const date = new Date(`1970-01-01T${value}Z`);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12; 
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `${formattedHours}:${formattedMinutes}${ampm}`;
  }
}