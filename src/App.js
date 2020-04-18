import React, { Component } from 'react';
import { Provider } from "react-redux";
import store from "./config/store";
import Routes from "./routes";
import PushController from './components/pushController';

class App extends Component {

  render() {

   return(
    <Provider store={store}>
      <PushController/>
      <Routes />
    </Provider>
   )
  }

}

export default App