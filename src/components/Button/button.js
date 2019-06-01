import React, { Component } from 'react';


class button extends Component{
    render() {

  return (
      <button onClick={this.props.setCurrentOutput(this.props.item)}>{this.props.item}</button>
  );
}}

export default button;