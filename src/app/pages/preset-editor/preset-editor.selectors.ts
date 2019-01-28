import { createSelector } from '@ngrx/store';

import * as fromReducers from '../../root-reducer';
import * as fromPreset from './preset-editor.reducer';

export const presetsSelector = (state: fromReducers.State) => state.preset;

export const selectAllPresets = createSelector(
  presetsSelector,
  fromPreset.selectAll
);

export const selectPreset = (id: number) => createSelector(
  presetsSelector,
  presetsState => presetsState.entities[id]
)
