import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberPhone'
})
export class NumberPhonePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (value.length === 3) {
      return value + '-';
    }
    return value;
  }

}
