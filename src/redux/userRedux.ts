import { USER } from '../constants';
import {
  UserState, authAction, setUserAction,
} from './type';

const initialState: UserState = {
  user: null,
  isAuth: false,
};

const userReducer = (
  state: UserState = initialState,
  action: authAction,
): UserState => {
  switch (action.type) {
    case USER.LOGOUT: {
      return { ...state, user: null, isAuth: false };
    }

    case USER.SET_USER: {
      return { ...state, user: (<setUserAction>action).payload, isAuth: true };
    }

    default: return state;
  }
};

export default userReducer;
