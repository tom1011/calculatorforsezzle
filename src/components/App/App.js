import React, { Component } from 'react';
import './App.css';
import Button from '../Button/button';



class App extends Component {
  state = {
    currentOutput: ''
  }

  setCurrentOutput = (str) => (event) => {
    this.setState({
      currentOutput: this.state.currentOutput + str // this is mutating state need to change it
    })}
  
render() {
  let numbers = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ];
  let mathoperation = ['+', '-', '/', '*', '='];
return (
  <div className="App">
    <header className="App-header">
      this is just setting up a quick and easy site to make a website caculator.
      ----
      <h1>{this.state.currentOutput}</h1>
      ---
      {numbers.map(items => <Button item= {items} setCurrentOutput = {this.setCurrentOutput}/>)}
      {mathoperation.map(items => <Button item={items} setCurrentOutput = {this.setCurrentOutput}/>)}

    </header>
  </div>
);
}}


export default App;
