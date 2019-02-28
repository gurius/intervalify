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
  progress: number;
  running: boolean = false;
  currentStep: any = this.sHelper.getBlankStep();
  intervalMainId;
  intervalProgressId;
  stepNumber: number = 0;
  nextStep: Step = this.sHelper.getBlankStep();
  sounds: any = {};
  currentTotalSeconds: any;
  unitOfProgress: number;

  setSteps(steps: Step[], repetitions: number) {
    while (repetitions > 0) {
      this.steps.push(...steps)
      repetitions--;
    }
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

  getTotalSeconds(){
    return this.currentStep.minutes * this.secInMinute + this.currentStep.seconds;
  }

  doStep() {
    if (this.stepNumber === this.steps.length) {
      this.stop();
      return;
    }
    this.soundPlayer.play(Sound.Kwak)
    this.currentStep = this.getCurrentStep();
    this.nextStep = this.getNextStep();
    this.currentTotalSeconds = this.getTotalSeconds();

    this.unitOfProgress = (this.maxProgress / this.currentTotalSeconds) / 10;
    this.controlProgressDirection()

    this.stepNumber++;
  }

  play() {
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
      this.progressTick();
    }, 100)
  }
  stop() {
    this.running = false;
    clearInterval(this.intervalMainId);
    clearInterval(this.intervalProgressId);
    this.stepNumber = 0;
    this.doStep();
  }
  pause() {
    this.running = false;
    clearInterval(this.intervalMainId);
    clearInterval(this.intervalProgressId);
  }

  constructor(
    private sHelper: StepsService,
    private soundPlayer: AudioService
  ) { }
}
