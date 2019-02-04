import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { RequestCountdowns, CountdownActionTypes, UpsertCountdowns } from './countdown.actions';
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
        return of({ type: CountdownActionTypes.CountdownsLoaded });
      }),

      catchError((err) => of({
        type: CountdownActionTypes.CountdownsError,
        payload: { error: { err, description: 'Adding Error' } }
      }))
    )

  constructor(
    private actions$: Actions,
    private dataSource: DataSourceService
  ) { }
}
