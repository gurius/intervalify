import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as rootReducer from '../../root-reducer';
import { Exercise } from 'src/app/models/exercise.model';
import { Countdown } from 'src/app/models/countdown.model';
import * as countdonwSelectors from '../countdown/countdown.selectors';
import { findIndex } from 'lodash';

@Component({
  selector: 'jt-exercise-editor',
  templateUrl: './exercise-editor.component.html',
  styleUrls: ['./exercise-editor.component.css']
})
export class ExerciseEditorComponent implements OnInit, OnDestroy {
  exercise: Exercise;
  dialogOptions: { title, isNew };
  countdowns: Countdown[] = [];
  deletedCountdowns: number[] = [];

  blank: Countdown = {
    id: 0,
    type: 'work',
    minutes: 0,
    seconds: 0,
    seqNo: 1,
    belongsToExercises: []
  };
  countdownsSubscription: Subscription;

  ngOnInit(): void {
    if (this.dialogOptions.isNew) {
      this.addCoundown();

    } else {

      this.countdownsSubscription = this.store.pipe(
        select(countdonwSelectors.allExerciseCountdowns(this.exercise.id))
      ).subscribe(
        countdowns => this.countdowns = countdowns
          .map(cd => Object.assign({}, cd))
      );

    }
  }

  ngOnDestroy(): void {
    if (this.countdownsSubscription) {
      this.countdownsSubscription.unsubscribe();
    }
  }

  addCoundown() {
    const id = Date.now();
    const belongsToExercises = [this.exercise.id]
    this.exercise.countdownsIds.push(id);
    this.countdowns.push(Object.assign({}, this.blank, { id, belongsToExercises }));
  }

  deleteCoundown(id) {
    const index = findIndex(this.countdowns, { id: id });
    if (index !== -1) {

      this.deletedCountdowns.push(this.countdowns.splice(index, 1)[0].id);
    }
  }

  constructor(
    private dialogReference: MatDialogRef<ExerciseEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { exercise, opts },
    private store: Store<rootReducer.State>
  ) {
    this.exercise = Object.assign({}, this.data.exercise);
    this.dialogOptions = this.data.opts;
  }
}
