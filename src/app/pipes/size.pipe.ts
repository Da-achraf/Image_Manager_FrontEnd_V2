import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'size',
  standalone: true
})
export class SizePipe implements PipeTransform {

  transform(value: any): string {
    const size = value
    if (!isNaN(size)){
      return `${(size / 1000).toFixed(2)} KB`
    }
    return ''
  }
}
