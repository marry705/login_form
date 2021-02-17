import { userData, User, authAction, DispatchType } from './type';
import { USER } from '../constants';

export function login(data: userData): (dispatch: DispatchType) => void {
  return (dispatch: DispatchType) => {
    dispatch(startRequest());
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'user': data }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw Error(res.statusText);
        }
      })
      .then((data: User) => dispatch(set(data)))
      .catch((error: Error) => {
        dispatch(addError(error.message));
        setTimeout(() => dispatch(cleaneError()), 5000);
      })
      .finally(() => dispatch(stopRequest()))
  }
};

export function edit(data: User): (dispatch: DispatchType) => void {
  return (dispatch: DispatchType) => {
    dispatch(startRequest());
    fetch('/api/user/edit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'user': data }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw Error(res.statusText);
        }
      })
      .then((data: User) => dispatch(set(data)))
      .catch((error: Error) => {
        dispatch(addError(error.message));
        setTimeout(() => dispatch(cleaneError()), 5000)
      })
      .finally(() => dispatch(stopRequest()))
  }
};

export function deleteUser(data: User): (dispatch: DispatchType) => void {
  return (dispatch: DispatchType) => {
    dispatch(startRequest());
    fetch('api/user/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'user': data }),
    })
      .then(res => res.json())
      .then(() => dispatch(logout()))
      .catch((error: Error) => {
        dispatch(addError(error.message));
        setTimeout(() => dispatch(cleaneError()), 5000);
      })
      .finally(() => dispatch(stopRequest()))
  }
};

export const logout = (): authAction => ({
  type: USER.LOGOUT,
  payload: null,
});

export const set = (data: User): authAction => ({
  type: USER.SET_USER,
  payload: data,
});

export const addError = (data: string): authAction => ({
  type: USER.ADD_ERROR,
  payload: data,
});

export const cleaneError = (): authAction => ({
  type: USER.CLEANE_ERROR,
  payload: null,
});

export const startRequest = (): authAction => ({
  type: USER.START_REQUEST,
  payload: null,
});

export const stopRequest = (): authAction => ({
  type: USER.STOP_REQUEST,
  payload: null,
});
