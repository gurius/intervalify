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
import * as fromExercise from './components/exercise-editor/exercise-editor.reducer';
import * as fromCountdown from './components/countdown/countdown.reducer';

export interface State {
  layout: fromLayoutReduser.State;
  preset: fromPreset.State;
  exercise: fromExercise.State;
  countdown: fromCountdown.State;
}

export const reducers: ActionReducerMap<State> = {
  layout: fromLayoutReduser.reducer,
  preset: fromPreset.reducer,
  exercise: fromExercise.reducer,
  countdown: fromCountdown.reducer,
};


export const metaReducers: MetaReducer<State>[]
  = !environment.production
    ? []
    : [];

// layout redusers

const getLayoutState = (state: State) => state.layout;

export const getShowNav
  = createSelector(getLayoutState, fromLayoutReduser.getShowNav);
