import React, { Component } from 'react';
import './App.css';
import Button from '../Button/button';
import { connect } from 'react-redux';


class App extends Component {
  state = {
    currentOutput: ''
  }

  // this function is passed the value to add to the disply.
  setCurrentOutput = (str) => (event) => {
    if (str === '=') {
      // dispaty to saga -- this will get the anser (server side). Then update the display after updating DB.
      this.props.dispatch({ type: 'POST_MATH_PROBLEM', payload: this.state })
      this.setState({
        currentOutput: ''
      })
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
    // all the options I will add to the caculator -- this is basic will add more late
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const mathoperation = ['+', '-', '/', '*', '='];
    return (
      <div className="App">
        <header className="App-header">
          this is just setting up a quick and easy site to make a website caculator.
      <h1>{this.state.currentOutput}</h1>
          {/* map takes the options for caculator and makes a button for each one. */}
          {numbers.map(items => <Button key={items} item={items} setCurrentOutput={this.setCurrentOutput} />)}
          {mathoperation.map(items => <Button key={items} item={items} setCurrentOutput={this.setCurrentOutput} />)}
          {this.props.lastTen.map(item => <p key={item.id}>{item.problem}</p>)}
        </header>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return reduxState;
}

export default connect(mapStateToProps)(App);
