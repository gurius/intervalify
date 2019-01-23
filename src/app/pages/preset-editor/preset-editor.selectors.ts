import * as fromReducers from '../../reducers';
import * as fromPreset from '../../reducers/preset.reducer';
import { createSelector } from '@ngrx/store';

export const selectAllPresets = createSelector(
  (state: fromReducers.State) => state.preset,
  fromPreset.selectAll
);
