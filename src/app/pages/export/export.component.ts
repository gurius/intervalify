import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TonusData } from 'src/app/models/tonus-data.model';
import { Preset } from 'src/app/models/preset.model';
import { Exercise } from 'src/app/models/exercise.model';
import { Countdown } from 'src/app/models/countdown.model';
import { Store } from '@ngrx/store';
import * as fromReducers from '../../root-reducer';
import { AddExercise } from 'src/app/components/exercise-editor/exercise-editor.actions';
import { AddPreset } from '../preset-editor/preset-editor.actions';
import { UpsertCountdowns } from 'src/app/components/countdown/countdown.actions';
import { delay } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'jt-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  loading: boolean;
  preset: Preset;
  exercises: Exercise[];
  countdowns: Countdown[];

  constructor(
    private ar: ActivatedRoute,
    private store: Store<fromReducers.State>,
    private sBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loading = true;
    this.ar.queryParamMap.pipe(delay(1000))
      .subscribe((paramMap: ParamMap) => {
        const presetData = paramMap.get('preset');
        const b64decoded = atob(presetData);
        const decoded = decodeURI(b64decoded);
        const data: TonusData = JSON.parse(decoded);
        const { presets, exercises, countdowns } = data;
        this.preset = presets[0];
        this.exercises = exercises;
        this.countdowns = countdowns;
        this.loading = false;
      });
  }

  clone() {
    this.loading = true;
    this.preset.id = Date.now();
    this.exercises.forEach(ex => {

      const exI = this.preset.exercisesIds.indexOf(ex.id);
      const newExId = Date.now() + Math.round(Math.random() * 1000);
      this.preset.exercisesIds.splice(exI, 1, newExId);
      ex.id = newExId;
      ex.belongsToPresets = [this.preset.id];

      this.countdowns.forEach(c => {
        if (ex.countdownsIds.includes(c.id)) {
          const newId = Date.now() + Math.round(Math.random() * 1000);
          const i = ex.countdownsIds.indexOf(c.id);
          ex.countdownsIds.splice(i, 1, newId);
          c.id = newId;
          c.belongsToExercises = [ex.id];
        }
      });

      this.store.dispatch(new AddExercise({ exercise: ex }));

    });
    setTimeout(() => {
      this.loading = false;
      this.sBar.open('saved', 'ok!', {
        duration: 2000,
        horizontalPosition: 'right',
        panelClass: 'saved-notify'
      })
    }, 1000);
  }

  getCountdowns(ids: number[]): Countdown[] {
    return this.countdowns.filter(cd => ids.includes(cd.id))
  }

  save() {
    this.clone();
    this.store.dispatch(new AddPreset({ preset: this.preset }));
    this.store.dispatch(new UpsertCountdowns({ countdowns: this.countdowns }));
  }
}
