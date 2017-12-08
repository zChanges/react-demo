import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducer as todoReducer } from './todo/todos';
import { reducer as filterReducer } from './todo/filter';

import Perf from 'react-addons-perf';

const win = window;
win.Perf = Perf;

const reducer = combineReducers({
  todos: todoReducer,
  filter: filterReducer
});

const middlewares = [];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(require('redux-immutable-state-invariant').default());
}

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  win && win.devToolsExtension ? win.devToolsExtension() : f => f
);
// const initialState = {
//   todos: [
//     {
//       id: 0,
//       text: 'First',
//       completed: true
//     },
//     {
//       id: 1,
//       text: 'Second',
//       completed: false
//     },
//     {
//       id: 2,
//       text: 'Third',
//       completed: true
//     }
//   ]
// };
export default createStore(reducer, {}, storeEnhancers);


// jq方式
// 获取input的值插入到数组中，再页面中循环数组展现，点击某一条更改type值改变状态，切换状态，通过状态过滤对应数据展现数据。
// 用户点击，过滤添加操作数据，然后渲染数据


// redux方式
// 用户点击添加，发出一个动作(active)为addtodo把input值传过去,派遣(dispatch)到Store,
// Store通过active的type动作，通过reducer中处理后拿到对应的数据，Store再做存储，在通过connect把store传给组件渲染。
// connect做了这些事：Provider把整个应用包裹住，connect获取到全局的state和dispatch，作为props传给组件，还做了当数据发送改变组件是否重新渲染
