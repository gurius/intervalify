import { Action } from '@ngrx/store';

export enum PresetsListPageActionTypes {
  LoadPresetsListPages = '[PresetsListPage] Load PresetsListPages'
}

export class LoadPresetsListPages implements Action {
  readonly type = PresetsListPageActionTypes.LoadPresetsListPages;
}

export type PresetsListPageActions = LoadPresetsListPages;
