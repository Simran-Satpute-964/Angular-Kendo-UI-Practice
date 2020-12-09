import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hour',
  pure: false,
})
export class HourPipe implements PipeTransform {
  transform(value: Date, args?: any) {
    if (!value) return null;

    return value.getHours();
  }
}
