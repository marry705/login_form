import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, cleanup, screen,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import {
  applyMiddleware, createStore, Store, AnyAction,
} from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as services from '../../services/catchService';
import rootReducer from '../../redux';
import { MainState, DispatchType, Company } from '../../redux/type';
import RegistrationForm from '.';

const data: Company[] = [
  { id: '1', name: 'company1' },
  { id: '2', name: 'company2' },
  { id: '3', name: 'company3' },
  { id: '4', name: 'company4' },
  { id: '5', name: 'company5' },
];

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

test('Checking the initial rendering of the component RegistrationForm', async () => {
  const getCompanies = jest.spyOn(services, 'getCompanies').mockImplementation(() => Promise.resolve(data));
  const store: Store<MainState, AnyAction> & { dispatch: DispatchType } = createStore(rootReducer, applyMiddleware(thunk));

  await act(async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegistrationForm />
        </BrowserRouter>
      </Provider>,
    );
  });

  expect(getCompanies).toHaveBeenCalledTimes(1);

  const burron = await screen.getByRole('button', { name: 'Enter' });
  expect(burron).toBeInTheDocument();
});
