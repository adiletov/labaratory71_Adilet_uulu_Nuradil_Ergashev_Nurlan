import React from 'react';
import './App.css';
import Header from "./Components/Header/header";
import {Route, Switch} from "react-router-dom";
import Dishes from "./Components/Dishes/dishes";
import Orders from "./Components/Orders/orders";

function App() {
  return (
    <div className="App">
        <Header/>
        <Switch>
          <Route path="/dishes" component={Dishes}/>
          <Route exact path="/orders" component={Orders}/>
        </Switch>
    </div>
  );
}

export default App;
