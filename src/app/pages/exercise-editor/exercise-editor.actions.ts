import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Exercise } from '../../models/exercise.model';

export enum ExerciseActionTypes {
  RequestExercises = '[Preset Editor] Request Exercises',
  LoadExercises = '[Preset Editor] Load Exercises',  //->
  ExercisesLoaded = '[Preset API] Exercises Loaded',
  ExercisesLoadingError = '[Preset API] Exercise Loading Error',
  AddExercise = '[Preset Editor] Add Exercise',      //->
  ExerciseAdded = '[Preser API] Exercise Added',
  ExerciseAddingError = '[Preser API] Exercise Adding Error',
  UpsertExercise = '[Preset Editor] Upsert Exercise',
  AddExercises = '[Preset Editor] Add Exercises',
  UpsertExercises = '[Preset Editor] Upsert Exercises',
  UpdateExercise = '[Preset Editor] Update Exercise',  //->
  ExerciseUpdated = '[Preser API] Exercise Updated',
  ExerciseUpdatingError = '[Preset API] Exercise Updating Error',
  UpdateExercises = '[Preset Editor] Update Exercises',
  DeleteExercise = '[Preset Editor] Delete Exercise',  //->
  ExerciseDeleted = '[Preset API] Exercise Deleted',
  ExerciseDeletionError = '[Preset API] Exercise Deletion Error',
  DeleteExercises = '[Preset Editor] Delete Exercises', //->
  ClearExercises = '[Preset Editor] Clear Exercises'
}

export class LoadExercises implements Action {
  readonly type = ExerciseActionTypes.LoadExercises;

  constructor(public payload: { exercises: Exercise[] }) { }
}

export class AddExercise implements Action {
  readonly type = ExerciseActionTypes.AddExercise;

  constructor(public payload: { exercise: Exercise }) { }
}

export class UpsertExercise implements Action {
  readonly type = ExerciseActionTypes.UpsertExercise;

  constructor(public payload: { exercise: Exercise }) { }
}

export class AddExercises implements Action {
  readonly type = ExerciseActionTypes.AddExercises;

  constructor(public payload: { exercises: Exercise[] }) { }
}

export class UpsertExercises implements Action {
  readonly type = ExerciseActionTypes.UpsertExercises;

  constructor(public payload: { exercises: Exercise[] }) { }
}

export class UpdateExercise implements Action {
  readonly type = ExerciseActionTypes.UpdateExercise;

  constructor(public payload: { exercise: Update<Exercise> }) { }
}

export class UpdateExercises implements Action {
  readonly type = ExerciseActionTypes.UpdateExercises;

  constructor(public payload: { exercises: Update<Exercise>[] }) { }
}

export class DeleteExercise implements Action {
  readonly type = ExerciseActionTypes.DeleteExercise;

  constructor(public payload: { id: string }) { }
}

export class DeleteExercises implements Action {
  readonly type = ExerciseActionTypes.DeleteExercises;

  constructor(public payload: { ids: string[] }) { }
}

export class ClearExercises implements Action {
  readonly type = ExerciseActionTypes.ClearExercises;
}

export class RequestExercises implements Action {
  readonly type = ExerciseActionTypes.RequestExercises;
}

export class ExercisesLoaded implements Action {
  readonly type = ExerciseActionTypes.ExercisesLoaded;

  constructor(public payload: { exercises: Exercise[] }) { }
}

export class ExercisesLoadingError implements Action {
  readonly type = ExerciseActionTypes.ExercisesLoadingError;
}

export class ExerciseAdded implements Action {
  readonly type = ExerciseActionTypes.ExerciseAdded;
}

export class ExerciseAddingError implements Action {
  readonly type = ExerciseActionTypes.ExerciseAddingError;
}

export class ExerciseUpdated implements Action {
  readonly type = ExerciseActionTypes.ExerciseUpdated;
}

export class ExerciseUpdatingError implements Action {
  readonly type = ExerciseActionTypes.ExerciseUpdatingError;
}

export class ExerciseDeleted implements Action {
  readonly type = ExerciseActionTypes.ExerciseDeleted;
}

export class ExerciseDeletionError implements Action {
  readonly type = ExerciseActionTypes.ExerciseDeletionError;
}

export type ExerciseActions =
  LoadExercises
  | RequestExercises
  | ExercisesLoaded
  | ExercisesLoadingError
  | ExerciseAdded
  | ExerciseAddingError
  | ExerciseUpdated
  | ExerciseUpdatingError
  | ExerciseDeleted
  | ExerciseDeletionError
  | AddExercise
  | UpsertExercise
  | AddExercises
  | UpsertExercises
  | UpdateExercise
  | UpdateExercises
  | DeleteExercise
  | DeleteExercises
  | ClearExercises;
