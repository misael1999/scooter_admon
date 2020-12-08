import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {
  
  transform(value: any, ...args: any[]) {
    throw new Error('Method not implemented.');
  }

/*   transform(value: number, categories: Category[]): string {
    return categories.filter((category: Category) => category.id === value)[0].name;
  }
 */
}
