import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Countdown } from '../../models/countdown.model';

export enum CountdownActionTypes {
  RequestCountdowns = '[Exercise Editor] Request Countdowns', // ->
  LoadCountdowns = '[Data API] Load Countdowns', // ->
  CountdownsUpdated = '[Data API] Countdowns Updated', // ->
  CountdownsError = '[Data API] Countdowns Error', // ->
  AddCountdown = '[Countdown] Add Countdown',
  UpsertCountdown = '[Countdown] Upsert Countdown',
  AddCountdowns = '[Countdown] Add Countdowns',
  UpsertCountdowns = '[Countdown Helper] Upsert Countdowns', // ->
  CountdownDeleted = '[Data API] Countdown Deleted', // ->
  UpdateCountdowns = '[Countdown] Update Countdowns',
  DeleteCountdown = '[Countdown] Delete Countdown',
  DeleteCountdowns = '[Countdown Helper] Delete Countdowns', // ->
  ClearCountdowns = '[Countdown] Clear Countdowns'
}

export class RequestCountdowns implements Action {
  readonly type = CountdownActionTypes.RequestCountdowns;
}

export class LoadCountdowns implements Action {
  readonly type = CountdownActionTypes.LoadCountdowns;

  constructor(public payload: { countdowns: Countdown[] }) { }
}

export class CountdownsUpdated implements Action {
  readonly type = CountdownActionTypes.CountdownsUpdated;
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

export class CountdownDeleted implements Action {
  readonly type = CountdownActionTypes.CountdownDeleted;

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

  constructor(public payload: { ids: number[] }) { }
}

export class ClearCountdowns implements Action {
  readonly type = CountdownActionTypes.ClearCountdowns;
}

export type CountdownActions =
  LoadCountdowns
  | RequestCountdowns
  | AddCountdown
  | CountdownsUpdated
  | UpsertCountdown
  | AddCountdowns
  | UpsertCountdowns
  | CountdownDeleted
  | UpdateCountdowns
  | DeleteCountdown
  | DeleteCountdowns
  | ClearCountdowns;
