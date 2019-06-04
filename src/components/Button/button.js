import React, { Component } from 'react';
import './button.css';

class button extends Component{
    render() {

  return (
      <button className='button' onClick={this.props.setCurrentOutput(this.props.item)}>{this.props.item}</button>
  );
}}

export default button;