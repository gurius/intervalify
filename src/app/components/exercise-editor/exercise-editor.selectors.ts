import { createSelector } from '@ngrx/store';

import * as fromReducers from '../../root-reducer';

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
