import { CombinedState } from 'redux';
import { USER, APPLICATION } from '../constants';

export type User = {
    id: string,
    companyId: string,
    name: string,
    email: string,
    password: string,
}

export type Company = {
    id: string,
    name: string,
}

export type UserData = {
    email: string,
    password: string
}

export type UserState = {
    user: User,
    isAuth: boolean,
}

export type InfoData = {
    message: string,
    type: 'error' | 'success',
}

export type AppState = {
    info: InfoData,
    loading: boolean,
}

export type MainState = CombinedState<{
    user: UserState,
    application: AppState,
}>

export type setUserAction = {
    type: typeof USER.SET_USER,
    payload: User,
}

interface logoutAction {
    type: typeof USER.LOGOUT,
    payload: null,
}

interface stopRequestAction {
    type: typeof APPLICATION.STOP_REQUEST,
    payload: null,
}

interface startRequestAction {
    type: typeof APPLICATION.START_REQUEST,
    payload: null,
}

export type errorAddAction = {
    type: typeof APPLICATION.ADD_ERROR,
    payload: string,
}

export type infoAddAction = {
    type: typeof APPLICATION.ADD_INFO,
    payload: string,
}

interface cleaneInfoAction {
    type: typeof APPLICATION.CLEANE_INFO,
    payload: null,
}

export type authAction = logoutAction | setUserAction;

export type appAction = stopRequestAction | startRequestAction | errorAddAction | infoAddAction | cleaneInfoAction;

export type mainAction = authAction | appAction;

export type DispatchType = (args: mainAction) => mainAction;
