import { Injectable } from "@angular/core";

import { Preset } from "./models/preset.model";

import { Exercise } from "./models/exercise.model";
import { Countdown } from "./models/countdown.model";
import { TonusData } from "./models/tonus-data.model";
import { findIndex } from "lodash-es";

@Injectable({
  providedIn: "root",
})
export class DataSourceService {
  constructor() {}

  getData(): TonusData {
    return JSON.parse(localStorage.getItem("tonus-data"));
  }

  setData(data: TonusData) {
    localStorage.setItem("tonus-data", JSON.stringify(data));
  }

  // presets
  getPresets = (): Preset[] => this.getData().presets;

  addPreset = (preset: Preset) => {
    let data = this.getData();

    if (!data) {
      data = {};
    }

    let { presets } = data;

    if (!presets) {
      presets = [];
    }

    presets.push(preset);

    data.presets = presets;
    this.setData(data);
  };

  updatePreset = (preset) => {
    const data = this.getData();
    let { presets } = data;

    if (!presets) {
      return { errorOccured: true };
    }

    const index = findIndex(presets, { id: preset.id });

    if (index !== -1) {
      presets[index] = Object.assign({}, presets[index], preset.changes);
      data.presets = presets;
      this.setData(data);
    }
  };

  deletePreset = (pId: number) => {
    const data = this.getData();

    deleteById(data, "presets", pId);

    this.setData(data);
  };

  //exercises
  getExercises = () => {
    let data = this.getData().exercises;
    if (!data) {
      data = [];
    }
    return data;
  };

  addExercise = (exercise: Exercise) => {
    let data = this.getData();

    let { exercises } = data;

    if (!exercises) {
      exercises = [];
    }

    exercises.push(exercise);

    data.exercises = exercises;

    this.setData(data);
  };

  updateExercise = (exercise) => {
    const data = this.getData();
    let { exercises } = data;

    if (!exercises) {
      return { errorOccured: true };
    }

    const index = findIndex(exercises, { id: exercise.id });

    if (index !== -1) {
      exercises[index] = Object.assign({}, exercises[index], exercise.changes);
      data.exercises = exercises;
      this.setData(data);
    }
  };

  deleteExercise = (id) => {
    const data = this.getData();

    const index = findIndex(data.exercises, { id });

    if (index !== -1) {
      data.exercises.splice(index, 1);
      this.setData(data);
    }
  };

  deleteExercises = (ids: number[]) => {
    const data = this.getData();

    ids.forEach((id) => deleteById(data, "exercises", id));

    this.setData(data);
  };

  //countdowns
  getCountdowns = () => {
    let data = this.getData().countdowns;
    if (!data) {
      data = [];
    }

    return data;
  };

  upsertCountdowns = (changedCountdowns: Countdown[]) => {
    const data = this.getData();
    let { countdowns } = data;

    if (!countdowns) {
      countdowns = [];
    }

    changedCountdowns.forEach((newCountdownEl) => {
      const index = findIndex(countdowns, { id: newCountdownEl.id });
      if (index !== -1) {
        countdowns[index] = Object.assign(
          {},
          countdowns[index],
          newCountdownEl,
        );
      } else {
        countdowns.push(newCountdownEl);
      }
    });

    data.countdowns = countdowns;
    this.setData(data);
  };

  deleteCountdowns = (ids: number[]) => {
    const data = this.getData();

    ids.forEach((id) => deleteById(data, "countdowns", id));

    this.setData(data);
  };
}

function deleteById(db: TonusData, table: string, id: number | string) {
  let source;

  switch (table) {
    case "presets":
      source = db.presets;
      break;
    case "exercises":
      source = db.exercises;
      break;
    case "countdowns":
      source = db.countdowns;
      break;
  }

  const index = source.findIndex((el) => el.id === id);

  if (index !== -1) {
    source.splice(index, 1);
  }
}
