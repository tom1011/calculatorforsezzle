import React, { Component } from 'react';
import './button.css';

class button extends Component{
    render() {

  return (
    <div className="grid-container">
    <button onClick={this.props.setCurrentOutput('(')} className="item1">(</button>
    <button onClick={this.props.setCurrentOutput(')')} className="item2">)</button>
    <button onClick={this.props.setCurrentOutput('%')} className="item3">%</button>
    <button onClick={this.props.setCurrentOutput('AC')} className="item4">AC</button>
    <button  onClick={this.props.setCurrentOutput('7')} className="item5">7</button>
    <button onClick={this.props.setCurrentOutput('8')} className="item6">8</button>
    <button onClick={this.props.setCurrentOutput('9')} className="item7">9</button>
    <button onClick={this.props.setCurrentOutput('/')} className="item8">/</button>
    <button onClick={this.props.setCurrentOutput('4')} className="item9">4</button>
    <button onClick={this.props.setCurrentOutput('5')} className="item10">5</button>
    <button onClick={this.props.setCurrentOutput('6')} className="item11">6</button>
    <button onClick={this.props.setCurrentOutput('*')} className="item12">*</button>
    <button onClick={this.props.setCurrentOutput('1')} className="item13">1</button>
    <button onClick={this.props.setCurrentOutput('2')} className="item14">2</button>
    <button onClick={this.props.setCurrentOutput('3')} className="item15">3</button>
    <button onClick={this.props.setCurrentOutput('-')} className="item16">-</button>
    <button onClick={this.props.setCurrentOutput('0')} className="item17">0</button>
    <button onClick={this.props.setCurrentOutput('.')} className="item18">.</button>
    <button onClick={this.props.setCurrentOutput('=')} className="item19">=</button>
    <button onClick={this.props.setCurrentOutput('+')} className="item20">+</button>
</div>
  );
}}

export default button;