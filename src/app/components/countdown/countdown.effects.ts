import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  RequestCountdowns,
  CountdownActionTypes,
  UpsertCountdowns,
  DeleteCountdowns
} from './countdown.actions';
import { mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { DataSourceService } from 'src/app/data-source.service';


@Injectable()
export class CountdownEffects {

  @Effect()
  requestCountdowns$ = this.actions$
    .pipe(

      ofType<RequestCountdowns>(CountdownActionTypes.RequestCountdowns),

      mergeMap(action => of({
        type: CountdownActionTypes.LoadCountdowns,
        payload: { countdowns: this.dataSource.getCountdowns() }
      })),

      catchError((err) => of({
        type: CountdownActionTypes.CountdownsError,
        payload: { error: { err, description: 'Loading Error' } }
      }))

    )

  @Effect()
  upsertCountdows$ = this.actions$
    .pipe(

      ofType<UpsertCountdowns>(CountdownActionTypes.UpsertCountdowns),

      mergeMap(action => {
        this.dataSource.upsertCountdowns(action.payload.countdowns);
        return of({ type: CountdownActionTypes.CountdownsUpdated });
      }),

      catchError((err) => of({
        type: CountdownActionTypes.CountdownsError,
        payload: { error: { err, description: 'Adding Error' } }
      }))
    )

  @Effect()
  deleteCountdowns$ = this.actions$
    .pipe(

      ofType<DeleteCountdowns>(CountdownActionTypes.DeleteCountdowns),

      mergeMap(action => {
        this.dataSource.deleteCountdowns(action.payload.ids);
        return of({ type: CountdownActionTypes.CountdownDeleted });
      }),

      catchError((err) => of({
        type: CountdownActionTypes.CountdownsError,
        payload: { error: { err, description: 'Deletion Error' } }
      }))

    )

  constructor(
    private actions$: Actions,
    private dataSource: DataSourceService
  ) { }
}
