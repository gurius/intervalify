import * as fromReducers from '../../reducers';
import * as fromPreset from '../../reducers/preset.reducer';
import { createSelector } from '@ngrx/store';

export const presetsSelector = (state: fromReducers.State) => state.preset;

export const selectAllPresets = createSelector(
  presetsSelector,
  fromPreset.selectAll
);

export const selectPreset = (id: number) => createSelector(
  presetsSelector,
  presetsState => presetsState.entities[id]
)
