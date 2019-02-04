import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Countdown } from '../../models/countdown.model';

export enum CountdownActionTypes {
  RequestCountdowns = '[Exercise Editor] Request Countdowns', // ->
  LoadCountdowns = '[Data API] Load Countdowns', // ->
  CountdownsLoaded = '[Data API] Countdowns Loaded',
  CountdownsError = '[Data API] Countdowns Error',
  AddCountdown = '[Countdown] Add Countdown',
  UpsertCountdown = '[Countdown] Upsert Countdown',
  AddCountdowns = '[Countdown] Add Countdowns',
  UpsertCountdowns = '[Countdown] Upsert Countdowns', // ->
  UpdateCountdown = '[Countdown] Update Countdown',
  UpdateCountdowns = '[Countdown] Update Countdowns',
  DeleteCountdown = '[Countdown] Delete Countdown',
  DeleteCountdowns = '[Countdown] Delete Countdowns',
  ClearCountdowns = '[Countdown] Clear Countdowns'
}

export class RequestCountdowns implements Action {
  readonly type = CountdownActionTypes.RequestCountdowns;
}

export class LoadCountdowns implements Action {
  readonly type = CountdownActionTypes.LoadCountdowns;

  constructor(public payload: { countdowns: Countdown[] }) { }
}

export class CountdownsLoaded implements Action {
  readonly type = CountdownActionTypes.CountdownsLoaded;
}

export class CountdownsLoadingError implements Action {
  readonly type = CountdownActionTypes.CountdownsError;

  constructor(public payload: {
    error: {
      err: Error,
      description: string
    }
  }) { }
}

export class AddCountdown implements Action {
  readonly type = CountdownActionTypes.AddCountdown;

  constructor(public payload: { countdown: Countdown }) { }
}

export class UpsertCountdown implements Action {
  readonly type = CountdownActionTypes.UpsertCountdown;

  constructor(public payload: { countdown: Countdown }) { }
}

export class AddCountdowns implements Action {
  readonly type = CountdownActionTypes.AddCountdowns;

  constructor(public payload: { countdowns: Countdown[] }) { }
}

export class UpsertCountdowns implements Action {
  readonly type = CountdownActionTypes.UpsertCountdowns;

  constructor(public payload: { countdowns: Countdown[] }) { }
}

export class UpdateCountdown implements Action {
  readonly type = CountdownActionTypes.UpdateCountdown;

  constructor(public payload: { countdown: Update<Countdown> }) { }
}

export class UpdateCountdowns implements Action {
  readonly type = CountdownActionTypes.UpdateCountdowns;

  constructor(public payload: { countdowns: Update<Countdown>[] }) { }
}

export class DeleteCountdown implements Action {
  readonly type = CountdownActionTypes.DeleteCountdown;

  constructor(public payload: { id: string }) { }
}

export class DeleteCountdowns implements Action {
  readonly type = CountdownActionTypes.DeleteCountdowns;

  constructor(public payload: { ids: string[] }) { }
}

export class ClearCountdowns implements Action {
  readonly type = CountdownActionTypes.ClearCountdowns;
}

export type CountdownActions =
  LoadCountdowns
  | RequestCountdowns
  | AddCountdown
  | CountdownsLoaded
  | UpsertCountdown
  | AddCountdowns
  | UpsertCountdowns
  | UpdateCountdown
  | UpdateCountdowns
  | DeleteCountdown
  | DeleteCountdowns
  | ClearCountdowns;
