import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { Preset } from '../models/preset.model';
import { AddPreset, UpdatePreset, DeletePreset }
  from '../pages/preset-editor/preset-editor.actions';
import * as fromReducers from '../root-reducer';
import * as fromSelectors from '../pages/preset-editor/preset-editor.selectors';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RelatedDataManagerService } from './related-data-manager.service';

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

  addPreset(preset: Preset): void {
    this.store.dispatch(new AddPreset({ preset }));
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

    return Object.assign({}, p);
  }

  deletePreset(preset) {
    this.store.dispatch(new DeletePreset({ id: preset.id }));
    this.rdm.onPresetRemove(preset);
  }

  getAllPresets(): Observable<Preset[]> {
    return this.store
      .pipe(
        select(fromSelectors.selectAllPresets())
      )
  }

  constructor(
    private store: Store<fromReducers.State>,
    private rdm: RelatedDataManagerService
  ) { }
}
