import React, { Component } from 'react';
import './App.css';
import Button from '../Button/button';



class App extends Component {
  state = {
    currentOutput: {}
  }

render() {
  let numbers = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ];
  let mathoperation = ['+', '-', '/', '*'];
return (
  <div className="App">
    <header className="App-header">

      this is just setting up a quick and easy site to make a website caculator.
        {mathoperation.map(items => <Button item={items} />)}


    </header>
  </div>
);
}}


export default App;
