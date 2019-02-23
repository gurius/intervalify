import { Component, OnInit, ViewChild, ElementRef, OnDestroy }
  from '@angular/core';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { capitalize } from 'lodash';

import * as fromReducers from '../../root-reducer';
import * as fromSelectors from './preset-editor.selectors';
import * as exerciseSelectors
  from 'src/app/components/exercise-editor/exercise-editor.selectors';
import { Preset } from 'src/app/models/preset.model';
import { UpdatePreset } from './preset-editor.actions';
import { Exercise } from 'src/app/models/exercise.model';
import { ExerciseEditorComponent }
  from 'src/app/components/exercise-editor/exercise-editor.component';
import {
  UpsertCountdowns,
  DeleteCountdowns
} from 'src/app/components/countdown/countdown.actions';
import * as countdonwSelectors
  from '../../components/countdown/countdown.selectors';
import { PresetService } from '../../helpers/preset.service';
import { ExerciseService } from 'src/app/helpers/exercise.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'jt-preset-editor',
  templateUrl: './preset-editor.component.html',
  styleUrls: ['./preset-editor.component.css']
})
export class PresetEditorComponent implements OnInit, OnDestroy {
  preset: Preset;
  exercises$: Observable<Exercise[]>;
  editingTitle: boolean;
  editingRepetitions: boolean;

  @ViewChild('titleInput') private titleInput: ElementRef<HTMLInputElement>;
  @ViewChild('repetitionsInput')
  private repetitionsInput: ElementRef<HTMLInputElement>;

  constructor(
    private store: Store<fromReducers.State>,
    private dialog: MatDialog,
    private pHelper: PresetService,
    private eHelper: ExerciseService
  ) { }

  ngOnInit() {
    this.store
      .pipe(
        // temporary get the first preset by default
        select(fromSelectors.selectPreset()),
        first()
      )
      .subscribe(preset => {
        if (!preset) {
          //Create and save to storage blank preset
          this.pHelper.addPreset()
        } else {
          this.preset = preset;
        }
      });

    this.exercises$ = this.store
      .pipe(
        select(exerciseSelectors.allExercisesOfPreset(this.preset.id))
      );

  }

  ngOnDestroy() {
  }

  onBlur(prop, val) {
    this.store.dispatch(new UpdatePreset({
      preset: {
        id: this.preset.id,
        changes: { [prop]: val }
      }
    }))
    let editingField = 'editing' + capitalize(prop);
    this[editingField] = false;
  }

  editProperty(prop) {
    let editingField = 'editing' + capitalize(prop);
    this[editingField] = true;
    // titleInput || repetitionsInput
    setTimeout(() => this[prop + 'Input'].nativeElement.focus(), 100)
  }

  newExercise() {
    const exercise = this.eHelper.getBlank(this.preset.id);
    const options = { title: 'New Exercise', isNew: true };

    this.openDialog(exercise, options);
  }

  editExercise(ex) {
    const exercise = Object.assign({}, ex);
    const options = { title: 'Editing', isNew: false };

    this.openDialog(exercise as Exercise, options);
  }

  private openDialog(exercise: Exercise, opts: { title, isNew }): void {
    const dref = this.dialog
      .open(ExerciseEditorComponent, {
        data: {
          exercise,
          opts
        }
      });

    const drefSubs = dref.afterClosed().subscribe(data => {
      if (!data) return;

      const { exercise, countdowns, deletedCountdowns } = data;

      // if there was data to save

      if (deletedCountdowns.length) {

        deletedCountdowns.forEach(dcId => {
          const index = exercise.countdownsIds.findIndex(cId => cId === dcId);
          if (index !== -1) {
            exercise.countdownsIds.splice(index, 1);
          }
        })

        this.store.dispatch(new DeleteCountdowns({ ids: deletedCountdowns }));
      }


      if (!opts.isNew) {
        this.eHelper.updateExercise(exercise);
      } else if (opts.isNew) {
        this.eHelper.addExercise(exercise, this.preset.id);
      }

      this.store.dispatch(new UpsertCountdowns({ countdowns: countdowns }));


      drefSubs.unsubscribe();
    });
  }

  deleteExercise(id) {
    this.eHelper.removeExercise(id, this.preset.id);
  }

  getCountdownsBy(exerciseId) {
    return this.store.pipe(
      select(countdonwSelectors.allExerciseCountdowns(exerciseId))
    );
  }
}
