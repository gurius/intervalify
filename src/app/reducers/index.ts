import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import * as fromLayoutReduser from './app.reducer';
import * as fromPreset from './preset.reducer';
import * as fromExercise from './exercise.reducer';

export interface State {
  layout: fromLayoutReduser.State;
  preset: fromPreset.State;
  exercise: fromExercise.State;
}

export const reducers: ActionReducerMap<State> = {
  layout: fromLayoutReduser.reducer,
  preset: fromPreset.reducer,
  exercise: fromExercise.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

// layout redusers

const getLayoutState = (state: State) => state.layout;

export const getShowNav = createSelector(getLayoutState, fromLayoutReduser.getShowNav);
