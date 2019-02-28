import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';


import { Preset } from 'src/app/models/preset.model';
import { StepsService } from 'src/app/helpers/steps.service';
import { StepperService } from './stepper.service';
import { PresetService } from 'src/app/helpers/preset.service';
import { Step } from 'src/app/models/step.model';

@Component({
  selector: 'jt-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit, OnDestroy {
  preset: Preset;
  sounds: any = {};
  currentStep: Step;


  ngOnInit() {
    this.router.queryParamMap
      .subscribe((params: ParamMap) => {
        const presetId = +params.get('pId');
        const steps = this.sHelper.getSteps(presetId);
        this.preset = this.pHelper.getPreset(presetId);
        this.stepper.setSteps(steps, this.preset.repetitions);
        this.stepper.doStep();
      })
  }

  ngOnDestroy(): void {
    this.stepper.stop();
    this.stepper.stepNumber--;
    this.stepper.steps = [];
  }

  play() {
    this.stepper.play();
  }
  stop() {
    this.stepper.stop();
  }
  pause() {
    this.stepper.pause();
  }

  constructor(
    private router: ActivatedRoute,
    private sHelper: StepsService,
    private pHelper: PresetService,
    private stepper: StepperService
  ) {
  }
}
