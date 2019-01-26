import * as fromReducers from '../../reducers';
import * as fromPreset from '../../reducers/preset.reducer';
import { createSelector } from '@ngrx/store';
import { each, includes, filter } from 'lodash';

export const presetsSelector = (state: fromReducers.State) => state.preset;

export const selectAllPresets = createSelector(
  presetsSelector,
  fromPreset.selectAll
);

export const selectPreset = (id: number) => createSelector(
  presetsSelector,
  presetsState => presetsState.entities[id]
)

export const exerciseSelector = (state: fromReducers.State) => state.exercise;

export const allExercisesOfPreset = (id: number) => createSelector(
  exerciseSelector,
  exerciseState => {
    const filtered = [];
    for (let key in exerciseState.entities) {
      const entity = exerciseState.entities[key];
      entity.belongsToPresets.includes(id) && filtered.push(entity)
    }
    return filtered;
  }
)
