import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Preset } from 'src/app/models/preset.model';


export enum PresetActionTypes {
  RequestPresets = '[Preset Editor] Request Presets', // From API
  PresetsLoaded = '[Data API] Presets Loaded',
  PresetsLoadingError = '[Data API] Preset Loading Error',
  PresetAdded = '[Data API] Preset Successfully Added',
  PresetAddingError = '[Data API] Preset Adding Error',
  PresetUpdated = '[Data API] Preset Updated Successfully',
  PresetDeleted = '[Data API] Preset Delated Successfully',
  PresetUpdatingError = '[Data API] Preset Updating Error',
  PresetDeletionError = '[Data API] Preset Deletion Error',
  LoadPresets = '[Preset Editor] Load Presets',
  AddPreset = '[Preset Editor] Add Preset',
  UpsertPreset = '[Preset Editor] Upsert Preset',//unused
  AddPresets = '[Preset Editor] Add Presets',//unused
  UpsertPresets = '[Preset Editor] Upsert Presets',//unused
  UpdatePreset = '[Preset Editor] Update Preset',
  UpdatePresets = '[Preset Editor] Update Presets',//unused
  DeletePreset = '[Preset Editor] Delete Preset',//unused
  DeletePresets = '[Preset Editor] Delete Presets',//unused
  ClearPresets = '[Preset Editor] Clear Presets'//unused
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
export class PresetDeletionError implements Action {
  readonly type = PresetActionTypes.PresetDeletionError;
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

export class PresetDeleted implements Action {
  readonly type = PresetActionTypes.PresetDeleted;
}

export class UpdatePresets implements Action {
  readonly type = PresetActionTypes.UpdatePresets;

  constructor(public payload: { presets: Update<Preset>[] }) { }
}

export class DeletePreset implements Action {
  readonly type = PresetActionTypes.DeletePreset;

  constructor(public payload: { id: number }) { }
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
  | PresetDeletionError
  | AddPreset
  | PresetAddingError
  | UpsertPreset
  | AddPresets
  | UpsertPresets
  | UpdatePreset
  | PresetUpdated
  | UpdatePresets
  | DeletePreset
  | PresetDeleted
  | DeletePresets
  | ClearPresets;
