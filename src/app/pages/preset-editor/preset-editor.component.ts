import { Component, OnInit, ViewChild, ElementRef, OnDestroy }
  from '@angular/core';
import { MatDialog } from '@angular/material';

import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { capitalize, filter } from 'lodash';

import * as fromReducers from '../../root-reducer';
import * as fromSelectors from './preset-editor.selectors';
import * as exerciseSelectors
  from 'src/app/components/exercise-editor/exercise-editor.selectors';
import { Preset } from 'src/app/models/preset.model';
import { AddPreset, UpdatePreset } from './preset-editor.actions';
import { Exercise } from 'src/app/models/exercise.model';
import { AddExercise, UpdateExercise, DeleteExercise }
  from 'src/app/components/exercise-editor/exercise-editor.actions';
import { ExerciseEditorComponent }
  from 'src/app/components/exercise-editor/exercise-editor.component';
import { UpsertCountdowns } from 'src/app/components/countdown/countdown.actions';



@Component({
  selector: 'jt-preset-editor',
  templateUrl: './preset-editor.component.html',
  styleUrls: ['./preset-editor.component.css']
})
export class PresetEditorComponent implements OnInit, OnDestroy {
  preset$: Observable<Preset>
  preset: Preset;
  presetSubscription: Subscription;

  blankPreset: Preset = {
    id: 1,
    title: '',
    exercisesIds: [],
    repetitions: 1
  };

  exercises$: Observable<Exercise[]>;
  exercises: Exercise[];

  blankExercise: Exercise = {
    id: 0,
    title: '',
    color: '#1c9bba',
    countdownsIds: [],
    seqNo: 0,
    repetitions: 1,
    belongsToPresets: []
  };

  exerciseSubscription: Subscription;
  editingTitle: boolean;
  editingRepetitions: boolean;
  exerciseIdsSubscription: Subscription;

  @ViewChild('titleInput') private titleInput: ElementRef<HTMLInputElement>;
  @ViewChild('repetitionsInput')
  private repetitionsInput: ElementRef<HTMLInputElement>;

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

          this.store.dispatch(new AddPreset({ preset: this.blankPreset }));

        } else {
          this.preset = preset;
        }
        this.blankExercise.belongsToPresets = [this.preset.id];
      });

    this.exercises$ = this.store
      .pipe(
        select(exerciseSelectors.allExercisesOfPreset(this.preset.id))
      );

    this.exerciseSubscription = this.exercises$.subscribe(exercises => {
      this.exercises = exercises;
    });

    this.presetSubscription.add(this.exerciseSubscription);
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
    // titleInput || repetitionsInput
    setTimeout(() => this[prop + 'Input'].nativeElement.focus(), 100)
  }

  newExercise() {
    const exercise = Object.assign({}, this.blankExercise);
    exercise.id = Date.now();
    const options = { title: 'New Exercise', isNew: true };

    this.openDialog(exercise, options);
  }

  private saveExercise(exercise): void {

    this.store.dispatch(new AddExercise({ exercise: exercise }));

    this.updateExercisesIds();
  }

  // probably should be delegated to Effects
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
    const exes = filter(this.exercises, { id })
    const exercise = Object.assign({}, exes[0]);
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

      const { exercise, countdowns } = data;

      if (data) {
        // if there was data to save
        if (!opts.isNew) {
          this.updateExercise(exercise);
        } else if (opts.isNew) {
          this.saveExercise(exercise);
        }

        this.store.dispatch(new UpsertCountdowns({ countdowns: countdowns }));
      }

      drefSubs.unsubscribe();
    });
  }



  deleteExercise(id) {
    this.store.dispatch(new DeleteExercise({ id }));
    this.updateExercisesIds();
  }
}
