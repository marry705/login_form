import { USER } from '../constants';
import {
  UserState, authAction, setUserAction,
} from './type';
import { getLocalStorage, setLocalStorage, clearStorage } from '../services/storageService';

const user = getLocalStorage('user');

const initialState: UserState = {
  user,
  isAuth: !!user,
};

const userReducer = (
  state: UserState = initialState,
  action: authAction,
): UserState => {
  switch (action.type) {
    case USER.LOGOUT:

      clearStorage('user');
      return { ...state, user: null, isAuth: false };

    case USER.SET_USER:

      setLocalStorage('user', (<setUserAction>action).payload);
      return { ...state, user: (<setUserAction>action).payload, isAuth: true };

    default: return state;
  }
};

export default userReducer;
