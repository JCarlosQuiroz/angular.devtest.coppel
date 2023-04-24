import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: "[letters]",
})
export class LettersDirective {
  private regex: RegExp = new RegExp(/^[a-zA-Z]([a-zA-Z]+ ?)*$/);
  private specialKeys: Array<string> = ['Backspace', 'Space', 'Tab', 'End', 'Home'];
  @HostListener("keydown", ["$event"]) public onKeydown(event: KeyboardEvent) {
    // if (
    //     (event.keyCode >= 15 && event.keyCode <= 64) ||
    //     event.keyCode >= 123 ||
    //     (event.keyCode >= 96 && event.keyCode <= 105)
    // ) {
    //     event.preventDefault();
    // }
    if (this.specialKeys.indexOf(event.key) !== -1 || event.key == ' ') {
      return;
    }

    if (!this.regex.test(event.key)) {
      event.preventDefault();
    }
  }
}
