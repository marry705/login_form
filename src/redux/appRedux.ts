import { APPLICATION } from '../constants';
import {
  AppState, appAction, errorAddAction, infoAddAction,
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
    case APPLICATION.START_REQUEST: {
      return { ...state, loading: true };
    }

    case APPLICATION.STOP_REQUEST: {
      return { ...state, loading: false };
    }

    case APPLICATION.CLEANE_INFO: {
      return { ...state, info: null };
    }

    case APPLICATION.ADD_INFO: {
      return { ...state, info: { message: (<infoAddAction>action).payload, type: 'success' } };
    }

    case APPLICATION.ADD_ERROR: {
      return { ...state, info: { message: (<errorAddAction>action).payload, type: 'error' } };
    }

    default: return state;
  }
};

export default appReducer;
