import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { catchError, mergeMap, map } from 'rxjs/operators'
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  PresetActionTypes,
  RequestPresets,
  AddPreset,
  UpdatePreset,
  PresetAdded,
  PresetUpdatingError,
  PresetUpdated,
  DeletePreset,
  PresetDeletionError,
  PresetDeleted
} from './preset-editor.actions';

import { DataSourceService } from 'src/app/data-source.service';



@Injectable()
export class PresetEditorEffects {

  
  loadPreset$ = createEffect(() => this.actions$.pipe(

    ofType<RequestPresets>(PresetActionTypes.RequestPresets),

    mergeMap(() => of({
      type: PresetActionTypes.PresetsLoaded,
      payload: { presets: this.dataSource.getPresets() }
    })),

    catchError(() => of({ type: PresetActionTypes.PresetsLoadingError }))

  ));

  
  addPreset$ = createEffect(() => this.actions$
    .pipe(

      ofType<AddPreset>(PresetActionTypes.AddPreset),

      map((action) => {
        this.dataSource.addPreset(action.payload.preset);
        return new PresetAdded();
      }),

      catchError(() => of({ type: PresetActionTypes.PresetAddingError }))

    ));

  
  updatePreset$ = createEffect(() => this.actions$
    .pipe(

      ofType<UpdatePreset>(PresetActionTypes.UpdatePreset),

      map((action) => {

        const res = this.dataSource.updatePreset(action.payload.preset);

        if (res && res.errorOccured) {
          return new PresetUpdatingError();
        } else {
          return new PresetUpdated();
        }

      }),

      catchError(() => of({ type: PresetActionTypes.PresetUpdatingError }))

    ));

  
  deletePreset$ = createEffect(() => this.actions$
    .pipe(

      ofType<DeletePreset>(PresetActionTypes.DeletePreset),
      map(action => {
        this.dataSource.deletePreset(action.payload.id);
        return new PresetDeleted();
      }),

      catchError(() => of(new PresetDeletionError()))
    ));

  constructor(
    private actions$: Actions,
    private dataSource: DataSourceService
  ) { }
}
