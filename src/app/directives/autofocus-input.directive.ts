import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[jtAutofocusInput]'
})
export class AutofocusInputDirective implements AfterViewInit {

  ngAfterViewInit() {
    setTimeout(() => this.el.nativeElement.focus(), 100);

  }

  constructor( private el: ElementRef<HTMLInputElement> ) { }

}
