import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: "[alphanumeric]",
})
export class AlphanumericDirective {
  private regex: RegExp = new RegExp(/^[a-zA-Z0-9]([a-zA-Z0-9]+ ?)*$/);
  private specialKeys: Array<string> = ['Backspace', 'Space', 'Tab', 'End', 'Home'];
  @HostListener("keydown", ["$event"]) public onKeydown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1 || event.key == ' ') {
      return;
    }

    if (!this.regex.test(event.key)) {
      event.preventDefault();
    }
  }
} 
