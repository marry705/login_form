import * as React from 'react';
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import {
  createStore, Store, applyMiddleware, AnyAction,
} from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/index';
import { DispatchType, MainState } from './redux/type';

import App from './App';

const store: Store<MainState, AnyAction> & { dispatch: DispatchType } = createStore(rootReducer, applyMiddleware(thunk));

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
