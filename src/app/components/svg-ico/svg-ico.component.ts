import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'jt-svg-ico',
  templateUrl: './svg-ico.component.html',
  styleUrls: ['./svg-ico.component.css']
})
export class SvgIcoComponent {
  @Input('icoName')
  icoName: string;

  @HostBinding('style.background-image')
  get backgroundImage() {
    return `url(assets/images/${this.icoName}.svg)`;
  }
  constructor() { }

}
