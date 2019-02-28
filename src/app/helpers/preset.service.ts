import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { Preset } from '../models/preset.model';
import { AddPreset, UpdatePreset }
  from '../pages/preset-editor/preset-editor.actions';
import * as fromReducers from '../root-reducer';
import * as fromSelectors from '../pages/preset-editor/preset-editor.selectors';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PresetService {

  getBlank(): Preset {
    return Object.assign({}, {
      id: Date.now(),
      title: '',
      exercisesIds: [],
      repetitions: 1
    })
  }

  addPreset(): void {
    this.store.dispatch(new AddPreset({ preset: this.getBlank() }));
  }

  updatePreset(id, changes): void {
    this.store.dispatch(new UpdatePreset({ preset: { id, changes } }));
  }

  getPreset(presetId) {
    let p: Preset;

    this.store
      .pipe(
        select(fromSelectors.selectPreset(presetId)),
        first()
      )
      .subscribe(preset => p = preset);

    return Object.assign({}, p);;
  }

  constructor(
    private store: Store<fromReducers.State>
  ) { }
}
