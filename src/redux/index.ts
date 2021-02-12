import { USER } from '../constants';
import { User, UserState, authAction, errorAddAction, editAction, loginAction } from './type';

const user: User = {};

const initialState: UserState = {
    user,
    error: '', 
    isAuth: !!user,
};

const rootReducer = (
  state: UserState = initialState,
  action: authAction,
): UserState => {
  switch (action.type) {
    case USER.LOGIN:

      return { ...state, user: (<loginAction>action).payload, isAuth: true };

    case USER.LOGOUT:

      return { ...state, user: {}, isAuth: false };

    case USER.EDIT:

      return { ...state, user: (<editAction>action).payload };

    case USER.CLEANE_ERROR:

        return { ...state, error: '' };

    case USER.ADD_ERROR:

        return { ...state, error: (<errorAddAction>action).payload };

    default: return state;
  }
};

export default rootReducer;
