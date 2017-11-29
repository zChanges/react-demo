import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {reducer as todoReducer} from './todo/todos';
// import Perf from 'react-addons-perf';

const reducer = combineReducers({
  todos: todoReducer
  // filter: filterReducer
});

// const win = window;
// win.Perf = Perf

// const middlewares = [];
// if (process.env.NODE_ENV !== 'production') {
//   middlewares.push(require('redux-immutable-state-invariant')());
// }

// const storeEnhancers = compose(
//   applyMiddleware(...middlewares),
//   (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
// );

export default createStore(reducer, {});
