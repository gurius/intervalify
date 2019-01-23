import { Action } from '@ngrx/store';

export enum HomeActionTypes {
  LoadHome = '[Home] Load page'
}

export class LoadHome implements Action {
  readonly type = HomeActionTypes.LoadHome;
}

export type HomeActions = LoadHome;
