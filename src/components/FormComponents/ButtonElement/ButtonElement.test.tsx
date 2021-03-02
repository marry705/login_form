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

beforeEach(() => {
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
});

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

test('Checking the initial rendering of the component ButtonElement', async () => {
  const burron = await screen.getByRole('button', { name: 'Enter' });
  expect(burron).toBeInTheDocument();
  fireEvent.click(burron);
  expect(onClick).toHaveBeenCalledTimes(1);
});
