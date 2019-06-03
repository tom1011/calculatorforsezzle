
import React, { Component } from "react";
import socketIOClient from "socket.io-client";


class Socket extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:8000" // local hose 8000 changed from tutorial
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("mathproblem", data => this.setState({ response: data }));
    console.log('in compont to see if this is logging it')
  }
  render() {
    const { response } = this.state;
    return (
        <div style={{ textAlign: "center" }}>
          {response
              ? <p>
                {response.map(item => <p key={item.id}>{item.problem}</p>)}
              </p>
              : <p>Loading... ie socket did not work?</p>}
        </div>
    );
  }
}

export default Socket;