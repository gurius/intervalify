import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromReducers from '../root-reducer';
import { UpdatePreset } from '../pages/preset-editor/preset-editor.actions';
import * as exerciseSelectors
  from 'src/app/components/exercise-editor/exercise-editor.selectors';
import { first } from 'rxjs/operators';
import { UpdateExercise, DeleteExercises }
  from '../components/exercise-editor/exercise-editor.actions';
import * as countdonwSelectors
  from 'src/app/components/countdown/countdown.selectors';
import { DeleteCountdowns } from '../components/countdown/countdown.actions';

@Injectable({
  providedIn: 'root'
})
export class RelatedDataManagerService {

  // update Preset.exercisesIds
  onExerciseAdd(presetId) {
    this.updateExercisesIds(presetId);
  }

  onExerciseRemove(presetId, exerciseId) {
    this.updateExercisesIds(presetId);
    this.deleteExercisesCountdowns(exerciseId)
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

  onPresetRemove(preset) {
    this.deletePresetsExercises(preset.exercisesIds);
    preset.exercisesIds.forEach(eId => this.deleteExercisesCountdowns(eId));
  }

  private updateExercisesIds(presetId) {
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

  private deleteExercisesCountdowns(exerciseId) {
    let countdownsIds;
    this.store.pipe(
      select(countdonwSelectors.allExerciseCountdowns(exerciseId)),
      first()
    ).subscribe(ids => countdownsIds = ids.map(countdown => countdown.id));
    this.store.dispatch(new DeleteCountdowns({ ids: countdownsIds }));
  }

  private deletePresetsExercises(ids) {
    this.store.dispatch(new DeleteExercises({ ids }));
  }

  constructor(
    private store: Store<fromReducers.State>,
  ) { }
}
