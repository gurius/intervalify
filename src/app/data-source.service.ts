import { Injectable } from '@angular/core';

import { Preset } from './models/preset.model';
import { findIndex } from 'lodash';



@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  constructor() { }

  getPresets = () => JSON.parse(localStorage.getItem(`presets`));

  addPreset = (preset: Preset) => {
    let presets = JSON.parse(localStorage.getItem(`presets`));

    if (!presets) {
      presets = []
    }

    presets.push(preset);
    localStorage.setItem(`presets`, JSON.stringify(presets));
  }

  updatePreset = (preset) => {
    const presets = JSON.parse(localStorage.getItem(`presets`));

    if (!presets) {
      return { errorOccured: true };
    }

    const index = findIndex(presets, {id: preset.id});

    presets[index] = Object.assign({}, presets[index], preset.changes);

    localStorage.setItem(`presets`, JSON.stringify(presets));

  }
}
