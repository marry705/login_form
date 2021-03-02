import {
  UserData, User, authAction, appAction, DispatchType,
} from './type';
import { USER, APPLICATION } from '../constants';

export const logout = (): authAction => ({
  type: USER.LOGOUT,
  payload: null,
});

export const set = (data: User): authAction => ({
  type: USER.SET_USER,
  payload: data,
});

export const addError = (data: string): appAction => ({
  type: APPLICATION.ADD_ERROR,
  payload: data,
});

export const addInfo = (data: string): appAction => ({
  type: APPLICATION.ADD_INFO,
  payload: data,
});

export const cleaneInfo = (): appAction => ({
  type: APPLICATION.CLEANE_INFO,
  payload: null,
});

export const startRequest = (): appAction => ({
  type: APPLICATION.START_REQUEST,
  payload: null,
});

export const stopRequest = (): appAction => ({
  type: APPLICATION.STOP_REQUEST,
  payload: null,
});

export function login(data: UserData): (dispatch: DispatchType) => void {
  return (dispatch: DispatchType) => {
    dispatch(cleaneInfo());
    dispatch(startRequest());
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: data }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw Error(res.statusText);
      })
      .then((user: User) => dispatch(set(user)))
      .catch((error: Error) => {
        dispatch(addError(error.message));
        setTimeout(() => {
          dispatch(cleaneInfo());
        }, 5000);
      })
      .finally(() => dispatch(stopRequest()));
  };
}

export function edit(data: User): (dispatch: DispatchType) => void {
  return (dispatch: DispatchType) => {
    dispatch(cleaneInfo());
    dispatch(startRequest());
    fetch(`/api/user/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: data }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw Error(res.statusText);
      })
      .then((user: User) => dispatch(set(user)))
      .then(() => {
        dispatch(addInfo('User was edit.'));
        setTimeout(() => {
          dispatch(cleaneInfo());
        }, 5000);
      })
      .catch((error: Error) => {
        dispatch(addError(error.message));
        setTimeout(() => {
          dispatch(cleaneInfo());
        }, 5000);
      })
      .finally(() => dispatch(stopRequest()));
  };
}

export function deleteUser(data: User): (dispatch: DispatchType) => void {
  return (dispatch: DispatchType) => {
    dispatch(cleaneInfo());
    dispatch(startRequest());
    fetch(`/api/user/${data.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(logout());
        }
        throw Error(res.statusText);
      })
      .catch((error: Error) => {
        dispatch(addError(error.message));
        setTimeout(() => {
          dispatch(cleaneInfo());
        }, 5000);
      })
      .finally(() => dispatch(stopRequest()));
  };
}
