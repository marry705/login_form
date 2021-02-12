import { currentUser, User, authAction } from './type';
import { USER } from '../constants';

export const login = (data: currentUser): authAction => ({
  type: USER.LOGIN,
  payload: data,
});

export const logout = (): authAction => ({
  type: USER.LOGOUT,
  payload: null,
});

export const edit = (data: User): authAction => ({
  type: USER.EDIT,
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
