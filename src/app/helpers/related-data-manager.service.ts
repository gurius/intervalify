import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromReducers from '../root-reducer';
import { UpdatePreset } from '../pages/preset-editor/preset-editor.actions';
import * as exerciseSelectors
  from 'src/app/components/exercise-editor/exercise-editor.selectors';
import { first } from 'rxjs/operators';
import { UpdateExercise }
  from '../components/exercise-editor/exercise-editor.actions';
import * as countdonwSelectors
  from 'src/app/components/countdown/countdown.selectors';

@Injectable({
  providedIn: 'root'
})
export class RelatedDataManagerService {

  // update Preset.exercisesIds
  onExerciseAddOrRemove(presetId) {
    this.store
      .pipe(
        select(exerciseSelectors.allExercisesOfPreset(presetId)),
        first()
      )

      .subscribe(exercises => {
        const exercisesIds = exercises.map(ex => ex.id);

        this.store.dispatch(new UpdatePreset({
          preset: {
            id: presetId,
            changes: { exercisesIds: exercisesIds }
          }
        }));

      });
  }

  onCountdownUpsertOrRemove(exerciseId) {
    this.store
      .pipe(
        select(countdonwSelectors.allExerciseCountdowns(exerciseId)),
        first()
      )

      .subscribe(countdowns => {
        const countdownsIds = countdowns.map(ex => ex.id);

        this.store.dispatch(new UpdateExercise({
          exercise: {
            id: exerciseId,
            changes: { countdownsIds }
          }
        }));

      });
  }

  constructor(
    private store: Store<fromReducers.State>,
  ) { }
}
