import { Component, OnInit, Input } from '@angular/core';

import { Countdown } from 'src/app/models/countdown.model';

@Component({
  selector: 'jt-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {

  @Input() countdown: Countdown;

  ngOnInit() { }

  timeCorrector(event, prop) {
    let val = Math.abs(+event.target.value);
    val = Math.floor(val);

    if (val > 59) {
      event.target.value = 59;
      this.countdown[prop] = 59;
    } else {
      event.target.value = val;
      this.countdown[prop] = val;
    }
  }

  constructor() { }
}
