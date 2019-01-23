import { Action } from '@ngrx/store';

export enum AppActionTypes {
  OpenNav = '[App] Open Nav',
  CloseNav = '[App] Close Nav'
}

export class OpenNav implements Action {
  readonly type = AppActionTypes.OpenNav;
}
export class CloseNav implements Action {
  readonly type = AppActionTypes.CloseNav;
}

export type AppActions = OpenNav | CloseNav;
