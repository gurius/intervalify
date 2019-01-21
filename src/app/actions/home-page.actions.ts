import { Action } from '@ngrx/store';

export enum HomePageActionTypes {
  LoadHomePages = '[HomePage] Load HomePages'
}

export class LoadHomePages implements Action {
  readonly type = HomePageActionTypes.LoadHomePages;
}

export type HomePageActions = LoadHomePages;
