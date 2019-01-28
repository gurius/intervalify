import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Preset } from '../../models/preset.model';
import { PresetActions, PresetActionTypes } from './preset-editor.actions';


export interface State extends EntityState<Preset> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Preset> = createEntityAdapter<Preset>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: PresetActions
): State {
  switch (action.type) {
    case PresetActionTypes.AddPreset: {
      return adapter.addOne(action.payload.preset, state);
    }

    case PresetActionTypes.UpsertPreset: {
      return adapter.upsertOne(action.payload.preset, state);
    }

    case PresetActionTypes.AddPresets: {
      return adapter.addMany(action.payload.presets, state);
    }

    case PresetActionTypes.UpsertPresets: {
      return adapter.upsertMany(action.payload.presets, state);
    }

    case PresetActionTypes.UpdatePreset: {
      return adapter.updateOne(action.payload.preset, state);
    }

    case PresetActionTypes.UpdatePresets: {
      return adapter.updateMany(action.payload.presets, state);
    }

    case PresetActionTypes.DeletePreset: {
      return adapter.removeOne(action.payload.id, state);
    }

    case PresetActionTypes.DeletePresets: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case PresetActionTypes.LoadPresets: {
      return adapter.addAll(action.payload.presets, state);
    }

    case PresetActionTypes.PresetsLoaded: {
      if (action.payload.presets) {
        return adapter.addAll(action.payload.presets, state);
      }
    }

    case PresetActionTypes.PresetsLoadingError: {

    }

    case PresetActionTypes.ClearPresets: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
