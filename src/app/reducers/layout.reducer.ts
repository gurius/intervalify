
import { LayoutActions, LayoutActionTypes } from '../actions/layout.actions';


export interface State {
  showNav: boolean;
}

export const initialState: State = {
  showNav: false
};

export function reducer(state = initialState, action: LayoutActions): State {
  switch (action.type) {
    case LayoutActionTypes.CloseNav:
      return { showNav: false };

    case LayoutActionTypes.OpenNav:
      return { showNav: true };

    default:
      return state;
  }
}

export const getShowNav = (state: State) => state.showNav;
