import { AppActions, AppActionTypes } from './/app.actions';


export interface State {
  showNav: boolean;
}

export const initialState: State = {
  showNav: false
};

export function reducer(state = initialState, action: AppActions): State {
  switch (action.type) {
    case AppActionTypes.CloseNav:
      return { showNav: false };

    case AppActionTypes.OpenNav:
      return { showNav: true };

    default:
      return state;
  }
}

export const getShowNav = (state: State) => state.showNav;
