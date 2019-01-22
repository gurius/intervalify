import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import * as fromLayoutReduser from './layout.reducer';

export interface State {
  layout: fromLayoutReduser.State;
}

export const reducers: ActionReducerMap<State> = {
  layout: fromLayoutReduser.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

// layout redusers

const getLayoutState = (state: State) => state.layout;

export const getShowNav = createSelector(getLayoutState, fromLayoutReduser.getShowNav);
