import { Directive, HostListener } from "@angular/core";

@Directive({
    selector: "[numeric]",
})
export class NumericDirective {
    private regex: RegExp = new RegExp(/^(0|[1-9][0-9]*)$/);
    private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];
    @HostListener("keydown", ["$event"]) public onKeydown(event: KeyboardEvent) {
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        if (!this.regex.test(event.key)) {
            event.preventDefault();
        }
    }
} 
