import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Store, select } from '@ngrx/store';

import * as fromReducers from '../../root-reducer';
import * as fromSelectors from '../preset-editor/preset-editor.selectors';
import { Preset } from 'src/app/models/preset.model';
import { first } from 'rxjs/operators';
import { StepperService } from 'src/app/helpers/stepper.service';
import { Step } from 'src/app/models/step.model';

@Component({
  selector: 'jt-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {
  running: boolean = false;
  preset: Preset;
  steps: Step[] = [];
  currentStep: any;
  intervalMainId: NodeJS.Timer;
  intervalProgressId: NodeJS.Timer;
  numInOrder: number = 0;
  nextStep: Step;
  progress: number;
  progressUnit: number;


  ngOnInit() {
    this.router.queryParamMap
      .subscribe((params: ParamMap) => {
        const presetId = +params.get('pId');
        const steps = this.sHelper.getSteps(presetId);


        this.store
          .pipe(
            // temporary get the first preset by default
            select(fromSelectors.selectPreset(presetId)),
            first()
          )
          .subscribe(preset => {
            this.preset = Object.assign({}, preset);
            while (this.preset.repetitions > 0){
              this.steps.push(...steps)
              this.preset.repetitions--;
            }
            this.doStep();
          });
      })
  }

  doStep() {
    if (this.numInOrder === this.steps.length) {
      this.stop();
      return;
    }
    this.currentStep = Object.assign({}, this.steps[this.numInOrder]);
    let nextNumInOrder = this.numInOrder + 1 >= this.steps.length
      ? this.steps.length
      : this.numInOrder + 1;
    this.nextStep = Object.assign({}, this.steps[nextNumInOrder]);
    this.currentStep.countdownSec =
      this.currentStep.minutes * 60 + this.currentStep.seconds;

    this.progressUnit = (100 / this.currentStep.countdownSec)/10;

    switch(this.currentStep.type){
      case 'work':
        this.progress = 0;
        break;
      case 'rest':
        this.progress = 100;
        break;
    }
    this.numInOrder++;
  }

  start() {
    this.running = true;
    this.intervalMainId = setInterval(() => {

      if (this.currentStep.seconds > 0) {
        this.currentStep.seconds--;
      } else if (this.currentStep.minutes > 0) {
        this.currentStep.minutes--;
        this.currentStep.seconds = 59;
      } else {
        this.doStep();
      }

    }, 1000);
    // for smooth progress running
    this.intervalProgressId = setInterval(() => {
      switch(this.currentStep.type){
        case 'work':
          this.progress += this.progressUnit;
          break;
        case 'rest':
          this.progress -= this.progressUnit;
          break;
      }
    }, 100)
  }
  stop() {
    this.running = false;
    clearInterval(this.intervalMainId);
    clearInterval(this.intervalProgressId);
    this.numInOrder = 0;
    this.doStep();
  }
  pause() {
    this.running = false;
    clearInterval(this.intervalMainId);
    clearInterval(this.intervalProgressId);
  }


  constructor(
    private router: ActivatedRoute,
    private store: Store<fromReducers.State>,
    private sHelper: StepperService
  ) { }
}
