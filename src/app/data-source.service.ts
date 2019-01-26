import { Injectable } from '@angular/core';

import { Preset } from './models/preset.model';
import { findIndex } from 'lodash';

import { Exercise } from './models/exercise.model';


@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  constructor() { }

  getData() {
    return JSON.parse(localStorage.getItem('tonus-data'));
  }

  setData(data) {
    localStorage.setItem('tonus-data', JSON.stringify(data));
  }

  // presets
  getPresets = () => this.getData().presets;


  addPreset = (preset: Preset) => {
    let data = this.getData();

    if (!data) {
      data = {};
    }

    let { presets } = data;

    if (!presets) {
      presets = []
    }

    presets.push(preset);

    data.presets = presets;
    this.setData(data);
  }

  updatePreset = (preset) => {
    const data = this.getData();
    let { presets } = data;

    if (!presets) {
      return { errorOccured: true };
    }

    const index = findIndex(presets, { id: preset.id });

    presets[index] = Object.assign({}, presets[index], preset.changes);
    data.presets = presets;
    this.setData(data);
  }

  //exercises
  getExercises = () => this.getData().exercises;

  addExercise = (exercise: Exercise) => {
    let data = this.getData();

    let { exercises } = data;

    if (!exercises){
      exercises = [];
    }

    exercises.push(exercise);

    data.exercises = exercises;

    this.setData(data);
  }

  //countdowns

}
