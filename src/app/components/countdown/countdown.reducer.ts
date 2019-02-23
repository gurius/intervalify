import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Countdown } from '../../models/countdown.model';
import { CountdownActions, CountdownActionTypes } from './countdown.actions';

export interface State extends EntityState<Countdown> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Countdown> = createEntityAdapter<Countdown>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: CountdownActions
): State {
  switch (action.type) {
    case CountdownActionTypes.AddCountdown: {
      return adapter.addOne(action.payload.countdown, state);
    }

    case CountdownActionTypes.UpsertCountdown: {
      return adapter.upsertOne(action.payload.countdown, state);
    }

    case CountdownActionTypes.AddCountdowns: {
      return adapter.addMany(action.payload.countdowns, state);
    }

    case CountdownActionTypes.UpsertCountdowns: {
      return adapter.upsertMany(action.payload.countdowns, state);
    }


    case CountdownActionTypes.UpdateCountdowns: {
      return adapter.updateMany(action.payload.countdowns, state);
    }

    case CountdownActionTypes.DeleteCountdown: {
      return adapter.removeOne(action.payload.id, state);
    }

    case CountdownActionTypes.DeleteCountdowns: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case CountdownActionTypes.LoadCountdowns: {
      return adapter.addAll(action.payload.countdowns, state);
    }

    case CountdownActionTypes.ClearCountdowns: {
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
