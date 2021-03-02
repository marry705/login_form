/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, screen, cleanup,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import {
  applyMiddleware, createStore, Store, AnyAction,
} from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from '../../../redux';
import { MainState, DispatchType, Company } from '../../../redux/type';
import CompanySelect from '.';

const data: Company[] = [
  { id: '1', name: 'company1' },
  { id: '2', name: 'company2' },
  { id: '3', name: 'company3' },
  { id: '4', name: 'company4' },
  { id: '5', name: 'company5' },
];
const onChange = jest.fn((): void => {});

beforeEach(() => {
  const store: Store<MainState, AnyAction> & { dispatch: DispatchType } = createStore(rootReducer, applyMiddleware(thunk));

  act(() => {
    render(
      <Provider store={store}>
        <CompanySelect
          companies={data}
          value="2"
          onChange={onChange}
        />
      </Provider>,
    );
  });
});

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

test('Checking the initial rendering of the component CompanySelect', async () => {
  const label = await screen.findByText('Company');
  expect(label).toBeInTheDocument();
  let select = await screen.findByText(data[2].name);
  expect(select).toBeInTheDocument();
  select = await screen.findByText(data[4].name);
  expect(select).toBeInTheDocument();
});
