import { Component, OnInit, Input } from '@angular/core';

import { Countdown } from 'src/app/models/countdown.model';

@Component({
  selector: 'jt-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {

  @Input() countdown: Countdown;

  minutes: number;
  seconds: number;

  ngOnInit() { }

  timeCorrector(event) {
    let val = +event.target.value;
    if (val < 0) {
      event.target.value = 0;
    } else if (val > 59) {
      event.target.value = 59;
    } else {
      event.target.value = +val;
    }

  }

  constructor() { }
}
