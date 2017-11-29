import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import ControlPanel from './components/ControlPanel';
import { Provider } from 'react-redux';
import { view as Todos} from './todo/todos'
import store from './Store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header> */}
        <Todos />
        {/* <ControlPanel /> */}
      </Provider>
    );
  }
}

export default App;
