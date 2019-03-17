import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';


import { Preset } from 'src/app/models/preset.model';
import { StepsService } from 'src/app/helpers/steps.service';
import { StepperService } from './stepper.service';
import { PresetService } from 'src/app/helpers/preset.service';
import { Step } from 'src/app/models/step.model';
import {
  style,
  state,
  transition,
  trigger,
  animate,
  query,
  keyframes,
  group,
  sequence
} from '@angular/animations';
import { Sound } from 'src/app/types/sound.type';
import { AudioService } from 'src/app/helpers/audio.service';

@Component({
  selector: 'jt-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
  animations: [
    trigger('fadeToggle', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(1.2)', filter: 'blur(3rem)' }),
        animate('300ms ease-in', style({ opacity: 1, transform: 'scale(1)', filter: 'blur(0)' })),
      ]),
      transition(':leave', [
        animate('0.5s', style({ opacity: 0, filter: 'blur(3rem)' }))
      ]),
      transition(':increment', [
        group([
          query('.step-current', [
            animate('800ms', keyframes([
              style({ transform: '*', offset: 0 }),
              style({ opacity: 0, transform: 'translateX(-100rem)', offset: 0.05 }),
              style({ opacity: 0, transform: 'translateY(5rem)', offset: 0.19 }),
              style({ opacity: 1, transform: 'translateY(5rem)', offset: 0.2 }),
              style({ transform: '*', offset: 0.8 }),
            ]))
          ]),
          query('.step-next', [
            animate('800ms', keyframes([
              style({ opacity: 0, offset: 0 }),
              style({ opacity: 0, transform: 'translateX(100rem)', offset: 0.6 }),
              style({ opacity: 1, transform: '*', offset: 0.8 })
            ]))
          ]),
          query('.arrow', [
            animate('800ms', keyframes([
              style({ transform: 'rotateZ(-0.2turn)', offset: 0 }),
              style({ transform: 'rotateX(1turn)', offset: 0.7 }),
              style({ transform: '*', offset: 0.8 })
            ]))
          ]),
        ])
      ]),
    ]),

    trigger('pulsation', [
      transition('* => *', [
        animate('1s', keyframes([
          style({ textShadow: '0 0  1.3rem white', offset: 0 }),
          style({ textShadow: '0 0  3rem white', offset: 0.4 }),
          style({ textShadow: '0 0  6rem white', offset: 0.5 }),
          style({ textShadow: '0 0  3rem white', offset: 0.6 }),
          style({ textShadow: '0 0  1.4rem white', offset: 1 }),
        ]))
      ])
    ]),

    trigger('prestart', [
      transition('button => *, :decrement, 1 => *', [
        animate('1s', keyframes([
          style({ opacity: 1, transform: 'scale(4)', offset: 0 }),
          style({ opacity: 0, transform: 'scale(5)', offset: 0.7 }),
          style({ opacity: 0, transform: 'scale(5)', offset: 0.9 }),
        ]))
      ]),
      state('*', style({ transform: 'scale(3)', opacity: 0 })),
      state('button', style({ transform: 'scale(3)', opacity: 1 })),
      transition('* => button', [
        style({ opacity: 0, transform: 'scale(5)', }),
        animate('0.5s 0.5s ease-out', style({ opacity: 1, transform: 'scale(3)', })),
      ])
    ]),
    trigger('finish', [
      transition(':enter', [
        style({ transform: 'scale(8)', backgroundColor: 'rgba(62, 62, 62, 0)' }),
        group([
          animate('0.8s cubic-bezier(1,.01,1,1)', style({ backgroundColor: 'rgba(62, 62, 62, 0.95 )' })),
          animate('0.8s', style({ transform: 'scale(1)' })),
          query('.done', [
            style({ transform: 'rotate(2turn)' }),
            animate('0.8s', style({ transform: 'rotate(-0.05turn)' }))
          ]),
          query('.replay', [
            style({ opacity: 0 }),
            sequence([
              animate('1s', style({ opacity: 0, transform: 'rotate(1turn)' })),
              animate('0.8s ease-out', style({ opacity: 1, transform: 'rotate(2turn)' }))
            ])
          ])
        ])
      ])
    ])
  ]
})
export class StepperComponent implements OnInit, OnDestroy {
  preset: Preset;
  sounds: any = {};
  currentStep: Step;
  initial: boolean;
  prestartCountdown: IterableIterator<string | number>;
  stage: string | number;
  launched: boolean = false;
  startIntervalId: any;
  prestartPhase: boolean;


  ngOnInit() {
    this.router.queryParamMap
      .subscribe((params: ParamMap) => {
        const presetId = +params.get('pId');
        this.preset = this.pHelper.getPreset(presetId);
        const steps = this.sHelper.getSteps(this.preset.id);
        this.stepper.setSteps(steps, this.preset.repetitions);
        this.stepper.reset();
        this.stepper.doStep();
        this.stepper.getState().subscribe(s => {
          s.accomplished && (this.stage = 'accomplished');
        });
        this.reset();
      })
  }

  ngOnDestroy(): void {
    this.stepper.stop();
    this.stepper.reset();
    this.stepper.steps = [];
    clearInterval(this.startIntervalId);
  }

  play() {
    this.stepper.play();
  }
  stop() {
    this.stepper.stop();
    this.stepper.reset();
    this.stepper.doStep();
    this.reset();
  }
  pause() {
    this.stepper.pause();
  }

  playPause(): void {
    if (this.prestartPhase) return;
    if (!this.launched){
      this.start();
    } else if (this.stepper.running) {
      this.pause()
    } else if (!this.stepper.running) {
      this.play();
    }
  }

  start() {
    this.launched = true;
    this.prestartPhase = true;
    this.startIntervalId = setInterval(() => {
      const stage = this.prestartCountdown.next();
      this.stage = stage.value;
      if (typeof this.stage === 'number') {
        this.soundPlayer.play(Sound.Bip);
      } else if (this.stage === 'GO!') {
        this.soundPlayer.play(Sound.ExEnd);
      }

      if (stage.done) {
        this.prestartPhase = false;
        clearInterval(this.startIntervalId);
        this.initial = false;
        this.stepper.play();
      }
    }, 1000)
  }

  reset() {
    this.prestartCountdown = this.generatePrestartStages();
    this.stage = this.prestartCountdown.next().value;
    this.initial = true;
    this.launched = false;
  }

  *generatePrestartStages(): IterableIterator<number | string> {
    let c = 3;
    yield 'button';
    while (c > 0) {
      yield c;
      c--;
    }
    yield 'GO!';
  }

  constructor(
    private router: ActivatedRoute,
    private sHelper: StepsService,
    private pHelper: PresetService,
    private stepper: StepperService,
    private soundPlayer: AudioService
  ) {
  }
}
