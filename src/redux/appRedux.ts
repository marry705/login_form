import { APPLICATION } from '../constants';
import {
  AppState, appAction, errorAddAction, infoAddAction, InfoData,
} from './type';

const initialState: AppState = {
  info: null,
  loading: false,
};

const appReducer = (
  state: AppState = initialState,
  action: appAction,
): AppState => {
  switch (action.type) {
    case APPLICATION.START_REQUEST:

      return { ...state, loading: true };

    case APPLICATION.STOP_REQUEST:

      return { ...state, loading: false };

    case APPLICATION.CLEANE_INFO:

      return { ...state, info: null };

    case APPLICATION.ADD_INFO: {
      console.log((<infoAddAction>action).payload);
      const infoData: InfoData = { message: (<infoAddAction>action).payload, type: 'success' };
      return { ...state, info: infoData };
    }

    case APPLICATION.ADD_ERROR: {
      const infoData: InfoData = { message: (<errorAddAction>action).payload, type: 'error' };
      return { ...state, info: infoData };
    }

    default: return state;
  }
};

export default appReducer;
