import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitWord'
})
export class SplitWordPipe implements PipeTransform {

  transform(value: string, maxNumber: number): unknown {

    if (value.length > maxNumber) {
      return value.substring(0, maxNumber) + '...';
    }
    return value;
  }

}
