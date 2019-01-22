import { Action } from '@ngrx/store';

export enum StepperActionTypes {
  LaunchStepper = '[Stepper] Launch',
  PauseStepper = '[Stepper] Pause',
  UnpauseStepper = '[Stepper] Unpause',
  StopStepper = '[Stepper] Stop'
}

export class LaunchStepper implements Action {
  readonly type = StepperActionTypes.LaunchStepper;
}
export class PauseStepper implements Action {
  readonly type = StepperActionTypes.PauseStepper;
}
export class UnpauseStepper implements Action {
  readonly type = StepperActionTypes.UnpauseStepper;
}
export class StopStepper implements Action {
  readonly type = StepperActionTypes.StopStepper;
}

export type StepperActions
  = LaunchStepper
  | PauseStepper
  | UnpauseStepper
  | StopStepper;
