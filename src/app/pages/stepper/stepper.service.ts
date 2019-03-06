import { Injectable } from '@angular/core';
import { Step } from 'src/app/models/step.model';
import { CountdownTypes } from 'src/app/models/countdown.model';
import { StepsService } from 'src/app/helpers/steps.service';
import { AudioService } from 'src/app/helpers/audio.service';
import { Sound } from 'src/app/types/sound.type';

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
  counter: number = 0;
  presetTotalTime: { minutes: number, seconds: number, totalSec: number }
    = { minutes: 0, seconds: 0, totalSec: 0 };
  unitOfTotalProggress: number;
  totalProgress: number = 0;

  setSteps(steps: Step[], repetitions: number) {
    while (repetitions > 0) {
      if (this.steps.length) {
        for (let i = 0; i < steps.length; i++) {
          let step = steps[i];
          step.presetRepetitions && this.steps.push(step);
        }
      } else {

        this.steps.push(...steps);
      }
      repetitions--;
    }
    const minutes = this.steps.reduce((acc, step) => acc + step.minutes, 0);
    const rawSeconds = this.steps.reduce((acc, step) => acc + step.seconds, 0);
    this.presetTotalTime.minutes = minutes + Math.trunc(rawSeconds / 60);
    this.presetTotalTime.seconds = Math.round(rawSeconds / 60 % 1 * 10 * 6);
    this.presetTotalTime.totalSec = minutes * 60 + rawSeconds;

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

  progressTick() {
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

  playBefore(sec: number) {
    this.currentTotalSeconds--;
    if (this.currentTotalSeconds <= sec && this.currentTotalSeconds > 0) {
      this.soundPlayer.play(Sound.Bip);
    }
    if (this.currentTotalSeconds === 0) {
      this.soundPlayer.play(Sound.ExEnd);
    }
  }

  doStep() {
    if (this.steps.length === 0) return;
    if (this.stepNumber === this.steps.length) {
      this.stop();
      this.soundPlayer.play(Sound.Finish);
      return;
    }
    this.currentStep = this.getCurrentStep();
    this.nextStep = this.getNextStep();
    this.currentTotalSeconds = this.getTotalSeconds();

    this.unitOfProgress = (this.maxProgress / this.currentTotalSeconds) / 10;
    this.unitOfTotalProggress = (this.maxProgress / this.presetTotalTime.totalSec) / 10;
    this.controlProgressDirection()

    this.stepNumber++;
  }

  play() {
    this.running = true;
    this.intervalProgressId = setInterval(() => {
      this.progressTick();
      if (this.currentStep.seconds > 0) {
        this.counter += 1;
        if (this.counter >= 10) {
          this.currentStep.seconds--;
          this.playBefore(3);
          this.counter = 0;
        }
      } else if (this.currentStep.minutes > 0) {
        this.counter += 1;
        if (this.counter >= 10) {
          this.currentStep.minutes--;
          this.currentStep.seconds = 59;
          this.playBefore(3);
          this.counter = 0;
        }
      } else {
        this.doStep();
      }
    }, 100)
  }
  stop() {
    this.running = false;
    clearInterval(this.intervalProgressId);
    this.stepNumber = 0;
    this.doStep();
  }
  pause() {
    this.running = false;
    clearInterval(this.intervalProgressId);
  }

  constructor(
    private sHelper: StepsService,
    private soundPlayer: AudioService
  ) { }
}
