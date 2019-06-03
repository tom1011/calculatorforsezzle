import React, { Component } from 'react';
import './App.css';
import Button from '../Button/button';
import { connect } from 'react-redux';


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
    if (str === '=') {
      // callback function to socket
      // first variable is the name of the object we are sending ie the math problem
      io.connect('http://localhost:8000/').emit('mathproblem',
        // this is the object we are sending to the socket under the name of mathproblem
        {
          problem: this.state.currentOutput
        })

      // dispaty to saga -- this will get the anser (server side). Then update the display after updating DB.
      // this.props.dispatch({ type: 'POST_MATH_PROBLEM', payload: this.state })
      this.setState({
        currentOutput: ''
      })
      console.log('logging that emit was hit')
    }
    else {
      this.setState({
        ...this.state,
        currentOutput: this.state.currentOutput + str // this is mutating state need to change it
      })
      console.log(this.state.currentOutput)
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: 'GET_LAST_TEN' }); // will get the last ten problems on page load.
  }


  render() {
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const mathoperation = ['+', '-', '/', '*'];
    let mapproblem = []
    // io.connect('http://localhost:8000/').on('mathproblem', function (data) {
    //   // I want a get request to run when this is hit so just do that
    //   console.log('logging data', data)
    //   mapproblem = data
    //   console.log('logging mapproblem',mapproblem)
    // })

    return (
      <div className="App">
        <header className="App-header">
          this is just setting up a quick and easy site to make a website caculator.
      <h1>{this.state.currentOutput}</h1>
          {/* map takes the options for caculator and makes a button for each one. */}
          {numbers.map(items => <Button key={items} item={items} setCurrentOutput={this.setCurrentOutput} />)}
          {mathoperation.map(items => <Button key={items} item={items} setCurrentOutput={this.setCurrentOutput} />)}
          <button onClick={this.setCurrentOutput('=')}>=</button>
          {/* {this.state.lastTen.map(item => <p key={item.id}>{item.problem}</p>)} */}
          {mapproblem.map(item => <p>{item.problem}</p>)}
          <SocketTest />
          {/* adding socket to the webpage */}


        </header>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return reduxState;
}

export default connect(mapStateToProps)(App);
