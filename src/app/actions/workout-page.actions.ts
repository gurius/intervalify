import { Action } from '@ngrx/store';

export enum WorkoutPageActionTypes {
  LoadWorkoutPages = '[WorkoutPage] Load WorkoutPages'
}

export class LoadWorkoutPages implements Action {
  readonly type = WorkoutPageActionTypes.LoadWorkoutPages;
}

export type WorkoutPageActions = LoadWorkoutPages;
