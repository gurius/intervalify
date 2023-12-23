import { strings } from "@angular-devkit/schematics";
import { Component, OnInit, Input } from "@angular/core";

import {
  Countdown,
  CountdownType,
  CountdownTypes,
} from "src/app/models/countdown.model";

@Component({
  selector: "jt-countdown",
  templateUrl: "./countdown.component.html",
  styleUrls: ["./countdown.component.css"],
})
export class CountdownComponent implements OnInit {
  @Input() countdown: Countdown;

  ngOnInit() {}

  timeCorrector(event: any, prop: string) {
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

  toggleWorkRest(countdown: Countdown, type: string) {
    if (type === "work") countdown.type = CountdownTypes.Work;
    if (type === "rest") countdown.type = CountdownTypes.Rest;
  }
  constructor() {}
}
