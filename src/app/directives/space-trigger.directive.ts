import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[jtSpaceTrigger]'
})
export class SpaceTriggerDirective {

  @Input('jtSpaceTrigger') trigger: () => void;

  @HostListener('window:keydown', ['$event'])
  onSpacePress(ev): void {
    if (ev.code === 'Space') {
      this.trigger();
    }
  }
  constructor() { }

}
