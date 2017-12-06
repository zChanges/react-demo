import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import ControlPanel from './components/ControlPanel';
import { Provider } from 'react-redux';
import { view as Todos} from './todo/todos';
import store from './Store';
import { view as Filter } from './todo/filter';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Filter />
          <Todos />
        </div>
      </Provider>
    );
  }
}

export default App;
