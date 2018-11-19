import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectKeys'
})
export class ObjectKeysPipe implements PipeTransform {

  transform(value: any, args?: any): string[] {
    if (!value) {
      return value;
    }
    if (typeof (value) !== 'object') {
      return value;
    }
    return Object.keys(value);
  }

}
