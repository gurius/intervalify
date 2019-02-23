import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { Preset } from '../models/preset.model';
import { AddPreset } from '../pages/preset-editor/preset-editor.actions';
import * as fromReducers from '../root-reducer';

@Injectable({
  providedIn: 'root'
})
export class PresetService {

  getBlank(): Preset  {
    return {
      id: Date.now(),
      title: '',
      exercisesIds: [],
      repetitions: 1
    }
  }

  addPreset(): void {
    this.store.dispatch(new AddPreset({ preset: this.getBlank() }));
  }

  constructor(
    private store: Store<fromReducers.State>
  ) { }
}
