import { Action } from '@ngrx/store';

export enum MenuBtnActionTypes {
  OpenMenuBtn = '[MenuBtn] Open MenuBtn',
  CloseMenuBtn = '[MenuBtn] Close MenuBtn',
  HideMenuBtn = '[MenuBtn] Hide MenuBtn',
  ShowMenuBtn = '[MenuBtn] Show MenuBtn',

}

export class OpenMenuBtn implements Action {
  readonly type = MenuBtnActionTypes.OpenMenuBtn;
}

export class CloseMenuBtn implements Action {
  readonly type = MenuBtnActionTypes.CloseMenuBtn;
}

export class HideMenuBtn implements Action {
  readonly type = MenuBtnActionTypes.HideMenuBtn;
}

export class ShowMenuBtn implements Action {
  readonly type = MenuBtnActionTypes.ShowMenuBtn;
}

export type MenuBtnActions
  = OpenMenuBtn
  | CloseMenuBtn
  | HideMenuBtn
  | ShowMenuBtn;
