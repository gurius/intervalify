import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';


import { Preset } from 'src/app/models/preset.model';
import { StepsService } from 'src/app/helpers/steps.service';
import { StepperService } from './stepper.service';
import { PresetService } from 'src/app/helpers/preset.service';
import { Step } from 'src/app/models/step.model';
import { style, state, transition, trigger, animate } from '@angular/animations';

@Component({
  selector: 'jt-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
  animations: [
    trigger('fadeToggle', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1.5s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.5s', style({ opacity: 0 }))
      ])
    ]),
    trigger('scaledToNormal', [
      state('preStart', style({
        transform: 'scale(5)'
      })),
      state('running', style({
        transform: 'scale(1)'
      })),
      transition('preStart => running', [
        animate(
          '0.5s cubic-bezier(0.075, 0.82, 0.165, 1)',
          style({ transform: 'scale(1)' })
        )
      ]),
      transition('running => preStart', [
        style({ opacity: 0 }),
        animate(
          '0.5s cubic-bezier(0.895, 0.03, 0.685, 0.22)',
          style({  opacity: 1 })
        )
      ])
    ])
  ]
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
