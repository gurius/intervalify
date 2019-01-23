import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Preset } from 'src/app/models/preset.model';


export enum PresetActionTypes {
  LoadPresets = '[Preset] Load Presets',
  AddPreset = '[Preset] Add Preset',
  UpsertPreset = '[Preset] Upsert Preset',
  AddPresets = '[Preset] Add Presets',
  UpsertPresets = '[Preset] Upsert Presets',
  UpdatePreset = '[Preset] Update Preset',
  UpdatePresets = '[Preset] Update Presets',
  DeletePreset = '[Preset] Delete Preset',
  DeletePresets = '[Preset] Delete Presets',
  ClearPresets = '[Preset] Clear Presets'
}

export class LoadPresets implements Action {
  readonly type = PresetActionTypes.LoadPresets;

  constructor(public payload: { presets: Preset[] }) {}
}

export class AddPreset implements Action {
  readonly type = PresetActionTypes.AddPreset;

  constructor(public payload: { preset: Preset }) {}
}

export class UpsertPreset implements Action {
  readonly type = PresetActionTypes.UpsertPreset;

  constructor(public payload: { preset: Preset }) {}
}

export class AddPresets implements Action {
  readonly type = PresetActionTypes.AddPresets;

  constructor(public payload: { presets: Preset[] }) {}
}

export class UpsertPresets implements Action {
  readonly type = PresetActionTypes.UpsertPresets;

  constructor(public payload: { presets: Preset[] }) {}
}

export class UpdatePreset implements Action {
  readonly type = PresetActionTypes.UpdatePreset;

  constructor(public payload: { preset: Update<Preset> }) {}
}

export class UpdatePresets implements Action {
  readonly type = PresetActionTypes.UpdatePresets;

  constructor(public payload: { presets: Update<Preset>[] }) {}
}

export class DeletePreset implements Action {
  readonly type = PresetActionTypes.DeletePreset;

  constructor(public payload: { id: string }) {}
}

export class DeletePresets implements Action {
  readonly type = PresetActionTypes.DeletePresets;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearPresets implements Action {
  readonly type = PresetActionTypes.ClearPresets;
}

export type PresetActions =
 LoadPresets
 | AddPreset
 | UpsertPreset
 | AddPresets
 | UpsertPresets
 | UpdatePreset
 | UpdatePresets
 | DeletePreset
 | DeletePresets
 | ClearPresets;
