import React from 'react';
import Project from "./project";
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from "redux";
import {Provider} from 'react-redux';
import Reducer from "./reducer";

const store = createStore(Reducer, applyMiddleware(thunk));

export default function App () {
  return (
      <Provider store={store}>
          <Project/>
      </Provider>
  );
};



