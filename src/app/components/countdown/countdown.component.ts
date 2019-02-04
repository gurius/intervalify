import { Component, OnInit, Input } from '@angular/core';

import { Countdown } from 'src/app/models/countdown.model';
import { findIndex } from 'lodash';

@Component({
  selector: 'jt-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {

  @Input() countdown: Countdown;
  @Input() countdowns: Countdown[];

  minutes: number;
  seconds: number;

  constructor() { }

  ngOnInit() { }

  deleteCoundown(id) {
    const index = findIndex(this.countdowns, { id });
    this.countdowns.splice(index, 1);
  }

  timeCorrector(event) {
    let val = event.target.value;
    if (val < 0) {
      event.target.value = 0;
    } else if (val > 59) {
      event.target.value = 59;
    }
  }
}
