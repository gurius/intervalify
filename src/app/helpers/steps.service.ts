import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { Step } from '../models/step.model';
import * as fromReducers from '../root-reducer';
import { first, mergeMap } from 'rxjs/operators';
import * as exerciseSelectors
  from 'src/app/components/exercise-editor/exercise-editor.selectors';
import * as countdonwSelectors
  from '../components/countdown/countdown.selectors';
import { of } from 'rxjs';
import { CountdownTypes } from '../models/countdown.model';

@Injectable({
  providedIn: 'root'
})
export class StepsService {

  getBlankStep(): Step {
    return Object.assign({}, {
      id: Date.now(),
      title: '',
      type: CountdownTypes.Work,
      minutes: 0,
      seconds: 0,
      seqNo: 1,
      presetRepetitions: true,
      color: '#1c9bba',
      belongsToExercises: []
    })
  }

  steps: Step[] = [];


  getSteps(presetId) {
    this.store
      .pipe(
        select(exerciseSelectors.allExercisesOfPreset(presetId)),
        mergeMap(exercises => {
          return of(exercises.map(ex => {
            let cns;

            this.store
              .pipe(
                select(countdonwSelectors.allExerciseCountdowns(ex.id))
              )
              .subscribe(countdowns => cns = { [ex.id]: countdowns })

            return cns;
          }
          ))
        },
          (exercises, countdowns) => {
            const steps = [];
            countdowns.forEach(cns => {
              const exId = +Object.keys(cns)[0];
              const exercise = Object.assign({}, exercises.find(ex => ex.id === exId));
              while (exercise.repetitions > 0) {
                exercise.repetitions--;
                cns[exId].forEach(cn => {
                  const countdown = Object.assign({}, cn);
                  countdown.title = exercise.title;
                  countdown.presetRepetitions = exercise.presetRepetitions
                  countdown.color = exercise.color;
                  steps.push(countdown)
                });
              }
            })
            return steps;
          }
        ),
        first()
      )
      .subscribe(steps => this.steps = steps);

    return this.steps;
  }


  constructor(private store: Store<fromReducers.State>) { }
}
