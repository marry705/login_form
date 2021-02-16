import { USER } from '../constants';
import { User, UserState, authAction, errorAddAction, setUserAction } from './type';
import { getLocalStorage, setLocalStorage, clearStorage } from '../services/storageService';

const user = getLocalStorage('user');

const initialState: UserState = {
    user,
    error: '', 
    loading: false,
    isAuth: !user,
};

const rootReducer = (
  state: UserState = initialState,
  action: authAction,
): UserState => {
  switch (action.type) {
    case USER.START_REQUEST:

      return { ...state, loading: true };

    case USER.STOP_REQUEST:

      return { ...state, loading: false };

    case USER.LOGOUT:

      clearStorage('user');
      return { ...state, user: {}, isAuth: false };
    
    case USER.SET_USER:

      setLocalStorage('user', (<setUserAction>action).payload);
      return { ...state, user: (<setUserAction>action).payload, isAuth: true };

    case USER.CLEANE_ERROR:

      return { ...state, error: '' };

    case USER.ADD_ERROR:

      return { ...state, error: (<errorAddAction>action).payload };

    default: return state;
  }
};

export default rootReducer;
