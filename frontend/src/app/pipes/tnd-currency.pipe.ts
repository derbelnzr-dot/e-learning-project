import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tndCurrency',
  standalone: true
})
export class TndCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    if (value == null) return '';
    const formatted = value % 1 === 0
      ? value.toFixed(0)
      : value.toFixed(2);
    return `${formatted} TND`;
  }
}
