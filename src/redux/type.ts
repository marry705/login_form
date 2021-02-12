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
    isAuth: boolean,
}

export type loginAction = {
    type: typeof USER.LOGIN,
    payload: User,
}

export type checkAction = {
    type: typeof USER.CHECK,
    payload: userData,
}

interface logoutAction {
    type: typeof USER.LOGOUT,
    payload: null,
}

export type editAction = {
    type: typeof USER.EDIT,
    payload: User,
}

export type errorAddAction = {
    type: typeof USER.ADD_ERROR,
    payload: string,
}

interface errorCreaneAction {
    type: typeof USER.CLEANE_ERROR,
    payload: null,
}

export type authAction = loginAction | checkAction | logoutAction | editAction | errorAddAction | errorCreaneAction;

export type DispatchType = (args: authAction) => authAction;