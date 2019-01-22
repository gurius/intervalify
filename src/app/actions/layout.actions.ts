import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  OpenNav = '[Layout] Open Nav',
  CloseNav = '[Layout] Close Nav'
}

export class OpenNav implements Action {
  readonly type = LayoutActionTypes.OpenNav;
}
export class CloseNav implements Action {
  readonly type = LayoutActionTypes.CloseNav;
}

export type LayoutActions = OpenNav | CloseNav;
