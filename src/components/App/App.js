import React, { Component } from 'react';
import './App.css';
import Button from '../Button/button';



class App extends Component {
  state = {
    currentOutput: ''
  }

  // this function is passed the value to add to the disply.
  setCurrentOutput = (str) => (event) => {
    if (str === '='){
      // dispaty to saga -- this will get the anser (server side). Then update the display after updating DB.
      this.props.dispatch({ type: 'POST_MATH_PROBLEM' ,payload: this.state.currentOutput})
    }
    else {
      this.setState({
        currentOutput: this.state.currentOutput + str // this is mutating state need to change it
      })
    }
    }
  
render() {
  // all the options I will add to the caculator -- this is basic will add more late.
  let numbers = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ];
  let mathoperation = ['+', '-', '/', '*', '='];
return (
  <div className="App">
    <header className="App-header">
      this is just setting up a quick and easy site to make a website caculator.
      <h1>{this.state.currentOutput}</h1>
      {/* map takes the options for caculator and makes a button for each one. */}
      {numbers.map(items => <Button item= {items} setCurrentOutput = {this.setCurrentOutput}/>)}
      {mathoperation.map(items => <Button item={items} setCurrentOutput = {this.setCurrentOutput}/>)}

    </header>
  </div>
);
}}


export default App;
