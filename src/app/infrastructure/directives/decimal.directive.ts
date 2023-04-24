import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[decimal]",
})
export class DecimalDirective {
  private regex: RegExp = new RegExp(/^\d*\.?\d{0,10}$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];
  constructor(private el: ElementRef) {
  }
  @HostListener("keydown", ["$event"]) public onKeydown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    const position = this.el.nativeElement.selectionStart;
    const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
} 
