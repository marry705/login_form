import { USER } from '../constants';

export type User = {
    id: string,
    companyId: string,
    name: string,
    email: string,
    password: string
} | {};

export type userData = {
    email: string,
    password: string
};

export type UserState = {
    user: User,
    error: string,
    loading: boolean,
    isAuth: boolean,
}

export type setUserAction = {
    type: typeof USER.SET_USER,
    payload: User,
}

interface logoutAction {
    type: typeof USER.LOGOUT,
    payload: null,
}

interface stopRequestAction {
    type: typeof USER.STOP_REQUEST,
    payload: null,
}

interface startRequestAction {
    type: typeof USER.START_REQUEST,
    payload: null,
}

export type errorAddAction = {
    type: typeof USER.ADD_ERROR,
    payload: string,
}

interface errorCreaneAction {
    type: typeof USER.CLEANE_ERROR,
    payload: null,
}

export type authAction = logoutAction |
    setUserAction |
    stopRequestAction |
    startRequestAction |
    errorAddAction |
    errorCreaneAction;

export type DispatchType = (args: authAction) => authAction;