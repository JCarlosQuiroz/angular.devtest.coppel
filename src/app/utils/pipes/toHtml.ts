import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'toHtml' })
export class ToHtml implements PipeTransform {
  transform(value: string): HTMLElement {
    const div: HTMLElement = document.createElement('div');
    div.innerHTML = value;
    return div;

  }
}
