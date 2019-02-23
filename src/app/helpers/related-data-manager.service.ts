import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromReducers from '../root-reducer';
import { UpdatePreset } from '../pages/preset-editor/preset-editor.actions';
import * as exerciseSelectors
  from 'src/app/components/exercise-editor/exercise-editor.selectors';
import { first } from 'rxjs/operators';

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

  constructor(
    private store: Store<fromReducers.State>,
  ) { }
}
