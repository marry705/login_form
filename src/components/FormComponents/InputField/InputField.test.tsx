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
import InputField from '.';

const changeField = jest.fn((): void => {});
const checkField = jest.fn((): void => {});

beforeEach(() => {
  const store: Store<MainState, AnyAction> & { dispatch: DispatchType } = createStore(rootReducer, applyMiddleware(thunk));

  act(() => {
    render(
      <Provider store={store}>
        <InputField
          type="email"
          value=""
          placeholder="Enter your email"
          reg={/.+@.+\.[A-Za-z]+$/}
          changeField={changeField}
          checkField={checkField}
        />
      </Provider>,
    );
  });
});

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

test('Checking the initial rendering of the component InputField with email type', async () => {
  const inputNode = await screen.getByPlaceholderText(/Enter your email/i);
  fireEvent.change(inputNode, { target: { value: 'test@test.com' } });
  expect(changeField).toHaveBeenCalledTimes(1);
  expect(changeField).toHaveBeenLastCalledWith('test@test.com');
  expect(checkField).toHaveBeenCalledTimes(1);
});
