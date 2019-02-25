import { Injectable } from '@angular/core';

import { Exercise } from '../models/exercise.model';
import { AddExercise, DeleteExercise, UpdateExercise }
  from '../components/exercise-editor/exercise-editor.actions';
import { Store } from '@ngrx/store';
import * as fromReducers from '../root-reducer';
import { RelatedDataManagerService } from './related-data-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  getBlank(presetId): Exercise {
    return Object.assign({}, {
      id: Date.now(),
      title: '',
      color: '#1c9bba',
      countdownsIds: [],
      seqNo: 0,
      repetitions: 1,
      belongsToPresets: [presetId]
    })
  }

  public addExercise(exercise, presetId): void {
    this.store.dispatch(new AddExercise({ exercise }));
    this.rdm.onExerciseAdd(presetId);
  }

  public removeExercise(id, presetId): void {
    this.store.dispatch(new DeleteExercise({ id }));
    this.rdm.onExerciseRemove(presetId, id);
  }

  public updateExercise(exercise): void {
    this.store.dispatch(new UpdateExercise({
      exercise: {
        id: exercise.id,
        changes: { ...exercise }
      }
    }));
  }

  constructor(
    private store: Store<fromReducers.State>,
    private rdm: RelatedDataManagerService
  ) { }
}
