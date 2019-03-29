import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../environments/environment';

import * as fromLayoutReduser from './pages/app/app.reducer';
import * as fromPreset from './pages/preset-editor/preset-editor.reducer';
import * as fromExercise
  from './components/exercise-editor/exercise-editor.reducer';
import * as fromCountdown from './components/countdown/countdown.reducer';
import * as fromMenuBtn from './pages/app/menu-btn.reducer';

export interface State {
  layout: fromLayoutReduser.State;
  preset: fromPreset.State;
  exercise: fromExercise.State;
  countdown: fromCountdown.State;
  menuBtn: fromMenuBtn.State;
}

export const reducers: ActionReducerMap<State> = {
  layout: fromLayoutReduser.reducer,
  preset: fromPreset.reducer,
  exercise: fromExercise.reducer,
  countdown: fromCountdown.reducer,
  menuBtn: fromMenuBtn.reducer,
};


export const metaReducers: MetaReducer<State>[]
  = !environment.production
    ? []
    : [];

// layout redusers

const getLayoutState = (state: State) => state.layout;

export const getShowNav
  = createSelector(getLayoutState, fromLayoutReduser.getShowNav);

const getMenuBtn = (state: State) => state.menuBtn;

export const getMenuBtnAppearance
  = createSelector(getMenuBtn, fromMenuBtn.getAppearance)
export const getMenuBtnVisibility
  = createSelector(getMenuBtn, fromMenuBtn.getVisibility)
