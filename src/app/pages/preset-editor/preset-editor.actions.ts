import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Preset } from 'src/app/models/preset.model';


export enum PresetActionTypes {
  RequestPresets = '[Preset] Request Presets',
  PresetsLoaded = '[Preset API] Presets Loaded',
  PresetsLoadingError = '[Preset API] Preset Loading Error',
  PresetAdded = '[Preset API] Preset Successfully Added',
  PresetAddingError = '[Preset API] Preset Adding Error',
  PresetUpdated = '[Preset API] Preset Updated Successfully',
  PresetUpdatingError = '[Preset API] Preset Updating Error',
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

  constructor(public payload: { presets: Preset[] }) { }
}

export class RequestPresets implements Action {
  readonly type = PresetActionTypes.RequestPresets;
}

export class PresetsLoaded implements Action {
  readonly type = PresetActionTypes.PresetsLoaded;

  constructor(public payload: { presets: Preset[] }) { }
}

export class PresetsLoadingError implements Action {
  readonly type = PresetActionTypes.PresetsLoadingError;
}

export class PresetAddingError implements Action {
  readonly type = PresetActionTypes.PresetAddingError;
}
export class PresetUpdatingError implements Action {
  readonly type = PresetActionTypes.PresetUpdatingError;
}

export class AddPreset implements Action {
  readonly type = PresetActionTypes.AddPreset;

  constructor(public payload: { preset: Preset }) { }
}

export class PresetAdded implements Action {
  readonly type = PresetActionTypes.PresetAdded;
}

export class UpsertPreset implements Action {
  readonly type = PresetActionTypes.UpsertPreset;

  constructor(public payload: { preset: Preset }) { }
}

export class AddPresets implements Action {
  readonly type = PresetActionTypes.AddPresets;

  constructor(public payload: { presets: Preset[] }) { }
}

export class UpsertPresets implements Action {
  readonly type = PresetActionTypes.UpsertPresets;

  constructor(public payload: { presets: Preset[] }) { }
}

export class UpdatePreset implements Action {
  readonly type = PresetActionTypes.UpdatePreset;

  constructor(public payload: { preset: Update<Preset> }) { }
}

export class PresetUpdated implements Action {
  readonly type = PresetActionTypes.PresetUpdated;
}

export class UpdatePresets implements Action {
  readonly type = PresetActionTypes.UpdatePresets;

  constructor(public payload: { presets: Update<Preset>[] }) { }
}

export class DeletePreset implements Action {
  readonly type = PresetActionTypes.DeletePreset;

  constructor(public payload: { id: string }) { }
}

export class DeletePresets implements Action {
  readonly type = PresetActionTypes.DeletePresets;

  constructor(public payload: { ids: string[] }) { }
}

export class ClearPresets implements Action {
  readonly type = PresetActionTypes.ClearPresets;
}

export type PresetActions =
  LoadPresets
  | RequestPresets
  | PresetsLoaded
  | PresetAdded
  | PresetsLoadingError
  | PresetUpdatingError
  | AddPreset
  | UpsertPreset
  | AddPresets
  | UpsertPresets
  | UpdatePreset
  | UpdatePresets
  | DeletePreset
  | DeletePresets
  | ClearPresets;
