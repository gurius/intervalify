import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Store, select } from '@ngrx/store';

import * as rootReducer from '../../root-reducer';
import { Exercise } from 'src/app/models/exercise.model';
import { Countdown } from 'src/app/models/countdown.model';
import * as countdonwSelectors from '../countdown/countdown.selectors';
import { CountdownService } from 'src/app/helpers/countdown.service';
import { first } from 'rxjs/operators';
import { DialogOptions, DialogTitleTypes }
  from 'src/app/models/dialog-options.model';

@Component({
  selector: 'jt-exercise-editor',
  templateUrl: './exercise-editor.component.html',
  styleUrls: ['./exercise-editor.component.css']
})
export class ExerciseEditorComponent implements OnInit, OnDestroy {
  exercise: Exercise;
  dialogOptions: DialogOptions;
  countdowns: Countdown[] = [];
  deletedCountdowns: number[] = [];

  ngOnInit(): void {
    if (this.dialogOptions.isNew) {
      this.addCoundown();

    } else {

      this.store.pipe(
        select(countdonwSelectors.allExerciseCountdowns(this.exercise.id)),
        first()
      ).subscribe(
        countdowns => this.countdowns = countdowns
          .map(cd => Object.assign({}, cd))
      );

    }
  }

  ngOnDestroy(): void {
    this.exercise.presetRepetitions
      = this.exercise.atEndOnly || this.exercise.atStartOnly
        ? false
        : true;
  }


  addCoundown() {
    const blank = this.cHelper.getBlank(this.exercise.id);
    this.exercise.countdownsIds.push(blank.id);
    this.countdowns.push(blank);
  }

  deleteCoundown(id) {
    const index = this.countdowns.findIndex(cn => cn.id === id);
    if (index !== -1) {
      const cId = this.countdowns.splice(index, 1)[0].id;
      this.deletedCountdowns.push(cId);
    }
  }

  inputCorrector(event): void {
    let val = +event.target.value
    !val && (val = 1);
    event.target.value = val;
    this.exercise.repetitions = val;
  }

  constructor(
    private dialogReference: MatDialogRef<ExerciseEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { exercise: Exercise, opts: DialogOptions },
    private store: Store<rootReducer.State>,
    private cHelper: CountdownService
  ) {
    this.exercise = Object.assign({}, this.data.exercise);
    this.dialogOptions = this.data.opts;
  }
}
