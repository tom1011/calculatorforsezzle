import React, { Component } from 'react';
import './App.css';
import Button from '../Button/button';
import io from 'socket.io-client';
// testing app.
import Socket from "../socket/socket";


// socket component
const socket = io.connect({
  secure: false,
  transports: ['websocket'],
  upgrade: false,
})
// end socket component

class App extends Component {

  state = {
    currentOutput: '',
    lastTen: this.props.lastTen
  }

  // this function is passed the value to add to the disply.
  setCurrentOutput = (str) => (event) => {
    // will send to server to save. also update client(s) to display new list.
    if (str === '=') {
      // callback function to socket
      // first variable is the name of the object we are sending ie the math problem

      socket.emit('mathproblem',
        // this is the object we are sending to the socket under the name of mathproblem
        {
          problem: this.state.currentOutput
        })

      //clear input screen after sending to server via socket.
      this.setState({
        currentOutput: ''
      })
    }
    // clear input
    else if (str === 'AC') {
      this.setState({
        ...this.state,
        currentOutput: ''
      })
    }// end clear input

    else {
      this.setState({
        ...this.state,
        currentOutput: this.state.currentOutput + str // this is mutating state need to change it
      })
    }
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          This is a simple web calculator that shows the last 10 problems of all users.
          <p className="hiddenBox">{this.state.currentOutput}</p>
          {/* map takes the options for calculator and makes a button for each one. split in two for diffrent css
          current dont implemented due to css breaking when using map. */}
          {/* <div className="numberButtons">
          {numbers.map(items => <Button key={items} item={items} setCurrentOutput={this.setCurrentOutput} />)}
          </div>
          <div className="mathOperationButtons">
          {mathoperation.map(items => <Button key={items} item={items} setCurrentOutput={this.setCurrentOutput} />)}
          </div> */}
          {/* the button compont is hard coded to make css work */}
          <Button setCurrentOutput={this.setCurrentOutput} />
          
          <div className="previousProblems">
            <p>Previous Problems:</p>
            {/* socket is the compont that has the websocket recever */}
            <Socket />
          </div>
        </header>
      </div>
    );
  }
}

export default (App);