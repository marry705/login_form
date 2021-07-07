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
import { Provider } from 'react-redux';
import rootReducer from '../../../redux';
import { MainState, DispatchType } from '../../../redux/type';
import ButtonElement from '.';

const onClick = jest.fn((): void => {});

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

test('Checking the initial rendering of the component ButtonElement', async () => {
  const store: Store<MainState, AnyAction> & { dispatch: DispatchType } = createStore(rootReducer, applyMiddleware(thunk));

  act(() => {
    render(
      <Provider store={store}>
        <ButtonElement
          onClick={onClick}
        />
      </Provider>,
    );
  });

  const button = await screen.getByRole('button', { name: 'Enter' });
  expect(button).toBeInTheDocument();

  fireEvent.click(button);
  expect(onClick).toHaveBeenCalledTimes(1);
});

test('Checking the initial rendering of the component ButtonElement with props', async () => {
  const buttonName = 'Name';
  const store: Store<MainState, AnyAction> & { dispatch: DispatchType } = createStore(rootReducer, applyMiddleware(thunk));

  act(() => {
    render(
      <Provider store={store}>
        <ButtonElement
          onClick={onClick}
          name={buttonName}
          disabled
        />
      </Provider>,
    );
  });

  const button = await screen.getByRole('button', { name: buttonName });
  expect(button).toBeInTheDocument();

  fireEvent.click(button);
  expect(onClick).toHaveBeenCalledTimes(0);
});
