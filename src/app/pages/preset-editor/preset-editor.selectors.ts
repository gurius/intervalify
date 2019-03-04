import { createSelector } from '@ngrx/store';

import * as fromReducers from '../../root-reducer';
import * as fromPreset from './preset-editor.reducer';

export const presetsSelector = (state: fromReducers.State) => state.preset;

export const selectAllPresets = () => createSelector(
  presetsSelector,
  fromPreset.selectAll
);

export const selectPreset = (id?: number | string) => createSelector(
  presetsSelector,
  presetsState => {
    if (!id) {
      id = presetsState.ids[0];
    }
    return presetsState.entities[id]
  }
)
