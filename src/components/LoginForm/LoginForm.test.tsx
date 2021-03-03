/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, screen, cleanup, fireEvent,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import {
  applyMiddleware, createStore, Store, AnyAction,
} from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import rootReducer from '../../redux';
import { MainState, DispatchType, UserData } from '../../redux/type';
import * as actions from '../../redux/actions';
import LoginForm from '.';

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

test('Checking the initial rendering of the component LoginForm', async () => {
  const store: Store<MainState, AnyAction> & { dispatch: DispatchType } = createStore(rootReducer, applyMiddleware(thunk));

  act(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>,
    );
  });

  const button = await screen.getByRole('button', { name: 'Enter' });
  expect(button).toBeInTheDocument();
  const email = await screen.getByPlaceholderText(/Enter your email/i);
  expect(email).toBeInTheDocument();
  const password = await screen.getByPlaceholderText(/Enter your password/i);
  expect(password).toBeInTheDocument();
});

test('Checking the login algorithm of the component LoginForm', async () => {
  const login = jest.spyOn(actions, 'login').mockImplementation(
    (_data: UserData): (dispatch: DispatchType) => void => (_dispatch: DispatchType): void => { },
  );
  const testUser: UserData = {
    email: 'test@test.com',
    password: 'qwerty1701',
  };
  const store: Store<MainState, AnyAction> & { dispatch: DispatchType } = createStore(rootReducer, applyMiddleware(thunk));

  act(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>,
    );
  });

  const email = await screen.getByPlaceholderText(/Enter your email/i);
  fireEvent.change(email, { target: { value: testUser.email } });

  const password = await screen.getByPlaceholderText(/Enter your password/i);
  fireEvent.change(password, { target: { value: testUser.password } });

  const button = await screen.getByRole('button', { name: 'Enter' });
  fireEvent.click(button);

  expect(login).toHaveBeenCalledTimes(1);
  expect(login).toHaveBeenLastCalledWith(testUser);
});
