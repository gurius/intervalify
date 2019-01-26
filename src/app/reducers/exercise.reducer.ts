import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Exercise } from '../models/exercise.model';
import { ExerciseActions, ExerciseActionTypes } from '../actions/exercise.actions';

export interface State extends EntityState<Exercise> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Exercise> = createEntityAdapter<Exercise>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: ExerciseActions
): State {//---------------------------------------------------
  switch (action.type) {
    case ExerciseActionTypes.AddExercise: {
      return adapter.addOne(action.payload.exercise, state);
    }

    case ExerciseActionTypes.UpsertExercise: {
      return adapter.upsertOne(action.payload.exercise, state);
    }

    case ExerciseActionTypes.AddExercises: {
      return adapter.addMany(action.payload.exercises, state);
    }

    case ExerciseActionTypes.UpsertExercises: {
      return adapter.upsertMany(action.payload.exercises, state);
    }

    case ExerciseActionTypes.UpdateExercise: {
      return adapter.updateOne(action.payload.exercise, state);
    }

    case ExerciseActionTypes.UpdateExercises: {
      return adapter.updateMany(action.payload.exercises, state);
    }

    case ExerciseActionTypes.DeleteExercise: {
      return adapter.removeOne(action.payload.id, state);
    }

    case ExerciseActionTypes.DeleteExercises: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case ExerciseActionTypes.LoadExercises: {
      return adapter.addAll(action.payload.exercises, state);
    }

    case ExerciseActionTypes.ClearExercises: {
      return adapter.removeAll(state);
    }

    case ExerciseActionTypes.ExerciseAdded: { }

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
