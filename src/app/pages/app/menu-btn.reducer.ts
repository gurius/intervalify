import { MenuBtnActions, MenuBtnActionTypes } from './menu-btn.actions';


export interface State {
  appearance: string,
  visible: boolean
}

export const initialState: State = {
  appearance: 'menu',
  visible: true
};

export function reducer(state = initialState, action: MenuBtnActions): State {
  switch (action.type) {
    case MenuBtnActionTypes.CloseMenuBtn:
      return {
        ...state,
        appearance: 'menu'
      };
    case MenuBtnActionTypes.HideMenuBtn:
      return {
        ...state,
        visible: false
      };
    case MenuBtnActionTypes.OpenMenuBtn:
      return {
        ...state,
        appearance: 'close',
      };
    case MenuBtnActionTypes.ShowMenuBtn:
      return {
        ...state,
        visible: true
      };

    default:
      return state;
  }
}

export const getAppearance = (state: State) => state.appearance;
export const getVisibility = (state: State) => state.visible;
