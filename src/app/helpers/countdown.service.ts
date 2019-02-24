import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { Countdown, CountdownTypes } from '../models/countdown.model';
import { RelatedDataManagerService } from './related-data-manager.service';
import * as fromReducers from '../root-reducer';
import { DeleteCountdowns, UpsertCountdowns }
  from '../components/countdown/countdown.actions';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {

  getBlank(exerciseId): Countdown {
    return Object.assign({}, {
      id: Date.now(),
      type: CountdownTypes.Work,
      minutes: 0,
      seconds: 0,
      seqNo: 1,
      belongsToExercises: [exerciseId]
    })
  }

  removeCountdowns(exerciseId, deletedCountdowns) {
    this.store.dispatch(new DeleteCountdowns({ ids: deletedCountdowns }));
    this.rdm.onCountdownUpsertOrRemove(exerciseId);
  }

  upsertCountdowns(exerciseId, countdowns) {
    this.store.dispatch(new UpsertCountdowns({ countdowns: countdowns }));
    this.rdm.onCountdownUpsertOrRemove(exerciseId);
  }

  constructor(
    private store: Store<fromReducers.State>,
    private rdm: RelatedDataManagerService
  ) { }
}
