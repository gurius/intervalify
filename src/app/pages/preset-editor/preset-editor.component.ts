import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { capitalize } from 'lodash';

import * as fromReducers from '../../reducers';
import * as fromSelectors from './preset-editor.selectors';
import { Preset } from 'src/app/models/preset.model';
import { AddPreset, UpdatePreset } from './preset-editor.actions';
import { Exercise } from 'src/app/models/exercise.model';
import { AddExercise, UpdateExercise, DeleteExercise } from 'src/app/actions/exercise.actions';
import { ExerciseEditorComponent } from '../exercise-editor/exercise-editor.component';



@Component({
  selector: 'jt-preset-editor',
  templateUrl: './preset-editor.component.html',
  styleUrls: ['./preset-editor.component.css']
})
export class PresetEditorComponent implements OnInit, OnDestroy {
  preset$: Observable<Preset>
  preset: Preset;
  presetSubscription: Subscription;
  exercises$: Observable<Exercise[]>;
  exercises: Exercise[];
  initialExercise: Exercise = {
    id: 0,
    title: '',
    color: '#1c9bba',
    countdownsIds: [],
    seqNo: 0,
    repetitions: 1,
    belongsToPresets: []
  };
  exercise: Exercise = Object.assign({}, this.initialExercise);
  exerciseSubscription: Subscription;
  editingTitle: boolean;
  editingRepetitions: boolean;
  exerciseIdsSubscription: Subscription;
  exIds: string[] | number[];

  @ViewChild('titleInput') private titleInput: ElementRef<HTMLInputElement>;
  @ViewChild('repetitionsInput') private repetitionsInput: ElementRef<HTMLInputElement>;

  constructor(
    private store: Store<fromReducers.State>,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.preset$ = this.store
      .pipe(
        select(fromSelectors.selectPreset(1))
      );

    this.presetSubscription = this.preset$
      .subscribe(preset => {

        if (!preset) {

          this.store.dispatch(new AddPreset({
            preset: {
              id: 1,
              title: '',
              exercisesIds: [],
              repetitions: 1
            }
          }));

        } else {
          this.preset = preset;
        }
        this.initialExercise.belongsToPresets = [this.preset.id];
        this.exercise.belongsToPresets = [this.preset.id];
      });

    this.exercises$ = this.store
      .pipe(
        select(fromSelectors.allExercisesOfPreset(this.preset.id))
      );

    this.exerciseSubscription = this.exercises$.subscribe(exercises => {
      this.exercises = exercises;
    });

    this.exerciseIdsSubscription = this.store
      .pipe(select(fromSelectors.exerciseIds())).subscribe(ids => {
        this.exIds = ids;
      });

    this.presetSubscription.add(this.exerciseSubscription);
    this.presetSubscription.add(this.exerciseIdsSubscription);
  }

  ngOnDestroy() {
    this.presetSubscription.unsubscribe();
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
    setTimeout(() => this[prop + 'Input'].nativeElement.focus(), 100)
  }

  addExercise() {
    const exercise = Object.assign({}, this.initialExercise);
    const options = { dialogTitle: 'New Exercise' };

    this.openDialog(exercise, options);
  }

  private saveExercise(exercise): void {

    exercise.id = Math.max.apply(Math, this.exIds)+1;

    this.store.dispatch(new AddExercise({ exercise: exercise }));

    this.updateExercisesIds();
  }

  private updateExercisesIds(): void {
    const exercisesIds = this.exercises.map(ex => ex.id);

    this.store.dispatch(new UpdatePreset({
      preset: {
        id: this.preset.id,
        changes: { exercisesIds: exercisesIds }
      }
    }));
  }

  private updateExercise(exercise): void {
    this.store.dispatch(new UpdateExercise({
      exercise: {
        id: exercise.id,
        changes: { ...exercise }
      }
    }));
  }

  editExercise(id) {
    const exercise = Object.assign({}, this.exercises[id]);
    const options = { dialogTitle: 'Editing' };

    this.openDialog(exercise, options);
  }

  private openDialog(exercise: Exercise, opts: { dialogTitle }): void {
    const dref = this.dialog
      .open(ExerciseEditorComponent, {
        data: {
          exercise,
          opts
        }
      });

    const drefSubs = dref.afterClosed().subscribe(exercise => {
      if (exercise) {

        if (opts.dialogTitle === 'Editing') {
          this.updateExercise(exercise);

        } else if (opts.dialogTitle === 'New Exercise') {
          this.saveExercise(exercise);
        }
      }

      drefSubs.unsubscribe();
    });
  }



  deleteExercise(id) {
    this.store.dispatch(new DeleteExercise({ id }));
    this.updateExercisesIds();
  }
}
