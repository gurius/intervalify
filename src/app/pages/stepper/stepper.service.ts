import { Injectable } from '@angular/core';
import { Step } from 'src/app/models/step.model';
import { CountdownTypes } from 'src/app/models/countdown.model';
import { StepsService } from 'src/app/helpers/steps.service';
import { AudioService } from 'src/app/helpers/audio.service';
import { Sound } from 'src/app/types/sound.type';
import { Subject } from 'rxjs';
import { StepperState } from './stepper-state';

@Injectable({
  providedIn: 'root'
})
export class StepperService {
  readonly maxProgress: number = 100;
  readonly minProgress: number = 0;
  readonly secInMinute: number = 60;
  steps: Step[] = [];
  progress: number = 0;
  running: boolean = false;
  currentStep: any = this.sHelper.getBlankStep();
  intervalProgressId;
  stepNumber: number = 0;
  nextStep: Step = this.sHelper.getBlankStep();
  sounds: any = {};
  currentTotalSeconds: any;
  unitOfProgress: number;
  oneSecondCounter: number = 0;
  presetTotalTime: { elapsed: string, remaining: string, totalSec: number, secondsRemaining: number, secondsElapsed: number }
    = { elapsed: '00:00', remaining: '00:00', totalSec: 0, secondsRemaining: 0, secondsElapsed: 0 };
  unitOfTotalProggress: number;
  totalProgress: number = 0;
  countdown: string;
  state: Subject<StepperState> = new Subject();
  workTotalTime: number;
  restTotalTime: number;

  setSteps(steps: Step[], repetitions: number) {
    let start = [];
    let repeatable = [];
    let end = [];

    for (let i = 0; i < steps.length; i++) {
      let step = steps[i];
      step.atStartOnly && start.push(step)
      step.presetRepetitions && repeatable.push(step);
      step.atEndOnly && end.push(step)
    }
    this.steps.push(...start);
    while (repetitions > 0) {
      this.steps.push(...repeatable);
      repetitions--;
    }
    this.steps.push(...end);

    const minutes = this.steps.reduce((acc, step) => acc + step.minutes, 0);

    const workMinutes = this.steps.reduce((acc, step) => {
      if  (step.type === CountdownTypes.Work){
        return acc + step.minutes
      } else {
        return acc;
      }
    }, 0);

    const resetMinutes = this.steps.reduce((acc, step) => {
      if  (step.type === CountdownTypes.Rest){
        return acc + step.minutes
      } else {
        return acc;
      }
    }, 0);

    const rawSeconds = this.steps.reduce((acc, step) => acc + step.seconds, 0);

    const workRawSeconds = this.steps.reduce((acc, step) => {
      if  (step.type === CountdownTypes.Work){
        return acc + step.seconds
      } else {
        return acc;
      }
    }, 0);

    const restRawSeconds = this.steps.reduce((acc, step) => {
      if  (step.type === CountdownTypes.Rest){
        return acc + step.seconds
      } else {
        return acc;
      }
    }, 0);

    this.workTotalTime = workMinutes * 60 + workRawSeconds;
    this.restTotalTime = resetMinutes * 60 + restRawSeconds;

    this.presetTotalTime.totalSec = minutes * 60 + rawSeconds;
    this.presetTotalTime.secondsRemaining = this.presetTotalTime.totalSec;
    this.presetTotalTime.remaining = this.secondsTommssStr(this.presetTotalTime.totalSec);
    this.unitOfTotalProggress = (this.maxProgress / this.presetTotalTime.totalSec) / 10;
  }

  getState() {
    return this.state;
  }

  controlProgressDirection() {
    switch (this.currentStep.type) {
      case CountdownTypes.Work:
        this.progress = this.minProgress;
        break;
      case CountdownTypes.Rest:
        this.progress = this.maxProgress;
        break;
    }
  }

  progressTic() {
    this.totalProgress += this.unitOfTotalProggress;
    switch (this.currentStep.type) {
      case CountdownTypes.Work:
        this.progress += this.unitOfProgress;
        break;
      case CountdownTypes.Rest:
        this.progress -= this.unitOfProgress;
        break;
    }
  }

  getNextStep() {
    const nextStepNum =
      this.stepNumber + 1
        >= this.steps.length
        ? this.steps.length
        : this.stepNumber + 1;

    return Object.assign({}, this.steps[nextStepNum]);
  }


  getCurrentStep() {
    return Object.assign({}, this.steps[this.stepNumber]);
  }

  getTotalSeconds() {
    return this.currentStep.minutes * this.secInMinute + this.currentStep.seconds;
  }

  playBefore(sec: number, countdown: number) {

    if (countdown <= sec && countdown > 0) {
      this.soundPlayer.play(Sound.Bip);
    }
    if (countdown === 0) {
      this.soundPlayer.play(Sound.ExEnd);
    }
  }

  doStep() {
    if (this.steps.length === 0) return;
    if (this.stepNumber === this.steps.length) {
      this.stop();
      this.soundPlayer.play(Sound.Finish);
      this.state.next({ accomplished: true });
      return;
    }
    this.currentStep = this.getCurrentStep();
    this.nextStep = this.getNextStep();
    this.currentTotalSeconds = this.getTotalSeconds();

    this.unitOfProgress = (this.maxProgress / this.currentTotalSeconds) / 10;
    this.controlProgressDirection()
    this.secondTic();
    this.stepNumber++;
  }

  play() {
    this.running = true;
    this.intervalProgressId = setInterval(() => {
      this.progressTic();
      if (this.currentStep.seconds > 0) {
        this.oneSecondCounter += 1;
        if (this.oneSecondCounter >= 10) {
          this.currentStep.seconds--;
          this.presetTotalTime.secondsRemaining--;
          this.currentTotalSeconds--;
          this.presetTotalTime.secondsElapsed++;
          this.playBefore(3, this.currentTotalSeconds);
          this.oneSecondCounter = 0;
          this.secondTic();
        }
      } else if (this.currentStep.minutes > 0) {
        this.oneSecondCounter += 1;
        if (this.oneSecondCounter >= 10) {
          this.currentStep.minutes--;
          this.presetTotalTime.secondsRemaining--;
          this.currentTotalSeconds--;
          this.presetTotalTime.secondsElapsed++;
          this.currentStep.seconds = 59;
          this.playBefore(3, this.currentTotalSeconds);
          this.oneSecondCounter = 0;
          this.secondTic();
        }
      } else {
        this.doStep();
      }
    }, 100)
  }
  stop() {
    this.running = false;
    clearInterval(this.intervalProgressId);
  }

  reset() {
    this.stepNumber = 0;
    this.totalProgress = 0;
    this.presetTotalTime.secondsElapsed = 0;
    this.presetTotalTime.secondsRemaining = this.presetTotalTime.totalSec;
  }

  pause() {
    this.running = false;
    clearInterval(this.intervalProgressId);
  }

  prependZero(val: number): string {
    return val.toString().padStart(2, '0');
  }

  tommssStr(m: number, s: number): string {
    const mm = this.prependZero(m);
    const ss = this.prependZero(s);
    return `${mm}:${ss}`;
  }

  secondsTommssStr(seconds: number): string {
    const arr: string[] = (new Date(seconds * 1000)).toUTCString().match(/(\d{2}:\d{2}:\d{2})/)[0].split(':');
    return `${arr[1]}:${arr[2]}`;
  }

  secondTic() {
    const { minutes: m, seconds: s } = this.currentStep;
    this.countdown = this.tommssStr(m, s);
    this.presetTotalTime.elapsed = this.secondsTommssStr(this.presetTotalTime.secondsElapsed);
    this.presetTotalTime.remaining = this.secondsTommssStr(this.presetTotalTime.secondsRemaining);
  }

  constructor(
    private sHelper: StepsService,
    private soundPlayer: AudioService
  ) { }
}
