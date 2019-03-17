import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'jt-repeat-with-preset-icon',
  templateUrl: './repeat-with-preset-icon.component.html',
  styleUrls: ['./repeat-with-preset-icon.component.css']
})
export class RepeatWithPresetIconComponent implements OnInit {

  @Input()
  repeat: boolean;

  @Input()
  disabled: boolean;

  @Input()
  color: string = '#a1a1a1';

  constructor() { }

  ngOnInit() {

  }

}
