import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textlimit',
  standalone: true
})
export class TextlimitPipe implements PipeTransform {

  transform(value: string, limit: 50): string {
    return value && value.length > limit ? value.substring(0, limit) + '...' : value;
  }

}
