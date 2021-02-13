import { User } from '../redux/type';

export const getLocalStorage = (key: string):User => (window.localStorage.getItem(key) ? JSON.parse(window.localStorage.getItem(key)) : []);

export const setLocalStorage = (key: string, value: User):void => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const clearStorage = (key: string):void => {
    window.localStorage.removeItem(key);
};