import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import * as reducers from './reducers';

const reducer = combineReducers(reducers);
const middlewares = [thunk]

export default function configureStore(preloadedState) {
  const store = createStore(reducer, preloadedState, composeWithDevTools(applyMiddleware(...middlewares)));

  return store;
};
