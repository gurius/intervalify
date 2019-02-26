import { createSelector } from '@ngrx/store';

import * as rootReduser from '../../root-reducer';
import * as fromCountdown from './countdown.reducer';

export const countdownsSelector = (state: rootReduser.State) => state.countdown;

export const allCountdowns = () => createSelector(
  countdownsSelector,
  fromCountdown.selectAll
);

export const allExerciseCountdowns = (id) => createSelector(
  countdownsSelector,
  countdownState => {
    const filtered = [];

    for (let key in countdownState.entities) {
      const entity = countdownState.entities[key];
      entity.belongsToExercises.includes(id) && filtered.push(entity)
    }

    return filtered;
  }
);

export const allCountdownsOfExercises = (ids: number[]) => createSelector(
  countdownsSelector,
  countdownState => {
    const filtered = [];

    for (let key in countdownState.entities) {
      const entity = countdownState.entities[key];
      ids.includes(entity.id) && filtered.push(entity)
    }

    return filtered;
  }

)
