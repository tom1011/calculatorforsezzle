import React, { Component } from 'react';

class button extends Component{
    render() {

  return (
      <button className={this.props.class} onClick={this.props.setCurrentOutput(this.props.item)}>{this.props.item}</button>
  );
}}

export default button;