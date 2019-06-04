import React, { Component } from 'react';
import './App.css';
import Button from '../Button/button';

// testing app.
import io from "socket.io-client";
import SocketTest from "../socket/socketIo";

class App extends Component {

  state = {
    currentOutput: '',
    lastTen: this.props.lastTen
  }

  // this function is passed the value to add to the disply.
  setCurrentOutput = (str) => (event) => {
    // will send to server to save to DB and update clients to display new one.
    if (str === '=') {
      // callback function to socket
      // first variable is the name of the object we are sending ie the math problem
      io('').emit('mathproblem',
        // this is the object we are sending to the socket under the name of mathproblem
        {
          problem: this.state.currentOutput
        })
      //clear input screen after sending to server via socket so that they can add more.
      this.setState({
        currentOutput: ''
      })
    }
    else {
      this.setState({
        ...this.state,
        currentOutput: this.state.currentOutput + str // this is mutating state need to change it
      })
    }
  }

  render() {
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const mathoperation = ['+', '-', '/', '*', '='];

    return (
      <div className="App">
        <header className="App-header">
          This is a simple web calculator that shows the last 10 problems of all users.
      <p className="hiddenBox">{this.state.currentOutput}</p>
          {/* map takes the options for calculator and makes a button for each one. split in two for diffrent css */}
          <div className="numberButtons">
          {numbers.map(items => <Button key={items} item={items} setCurrentOutput={this.setCurrentOutput} />)}
          </div>
          <div className="mathOperationButtons">
          {mathoperation.map(items => <Button key={items} item={items} setCurrentOutput={this.setCurrentOutput} />)}
          </div>
          {/* socket is the compont that has the websocket recever */}
          <div className="previousProblems">
          <p>Previous Problems:</p>
          <SocketTest />
          </div>
        </header>
      </div>
    );
  }
}

export default (App);
