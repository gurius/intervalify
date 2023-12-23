import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import {
  RequestExercises,
  ExerciseActionTypes,
  AddExercise,
  UpdateExercise,
  DeleteExercise,
  DeleteExercises,
} from "src/app/components/exercise-editor/exercise-editor.actions";
import { mergeMap, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { DataSourceService } from "src/app/data-source.service";

@Injectable()
export class ExerciseEditorEffects {
  loadExercises$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<RequestExercises>(ExerciseActionTypes.RequestExercises),

        mergeMap(() =>
          of({
            type: ExerciseActionTypes.LoadExercises,
            payload: { exercises: this.dataSource.getExercises() },
          }),
        ),

        catchError(() =>
          of({ type: ExerciseActionTypes.ExercisesLoadingError }),
        ),
      ),
    { useEffectsErrorHandler: false },
  );

  addExercise$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<AddExercise>(ExerciseActionTypes.AddExercise),

        mergeMap((action) => {
          this.dataSource.addExercise(action.payload.exercise);
          return of({ type: ExerciseActionTypes.ExerciseAdded });
        }),

        catchError(() => of({ type: ExerciseActionTypes.ExerciseAddingError })),
      ),
    { useEffectsErrorHandler: false },
  );

  updateExercise$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<UpdateExercise>(ExerciseActionTypes.UpdateExercise),

        mergeMap((action) => {
          this.dataSource.updateExercise(action.payload.exercise);
          return of({ type: ExerciseActionTypes.ExerciseUpdated });
        }),

        catchError(() =>
          of({ type: ExerciseActionTypes.ExerciseUpdatingError }),
        ),
      ),
    { useEffectsErrorHandler: false },
  );

  deleteExercise$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<DeleteExercise>(ExerciseActionTypes.DeleteExercise),

        mergeMap((action) => {
          this.dataSource.deleteExercise(action.payload.id);
          return of({ type: ExerciseActionTypes.ExerciseDeleted });
        }),

        catchError(() =>
          of({ type: ExerciseActionTypes.ExerciseDeletionError }),
        ),
      ),
    { useEffectsErrorHandler: false },
  );

  deleteExercises$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<DeleteExercises>(ExerciseActionTypes.DeleteExercises),

        mergeMap((action) => {
          this.dataSource.deleteExercises(action.payload.ids);
          return of({ type: ExerciseActionTypes.ExercisesDeleted });
        }),

        catchError(() =>
          of({ type: ExerciseActionTypes.ExerciseDeletionError }),
        ),
      ),
    { useEffectsErrorHandler: false },
  );

  constructor(
    private actions$: Actions,
    private dataSource: DataSourceService,
  ) {}
}
