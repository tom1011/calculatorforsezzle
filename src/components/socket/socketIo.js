
import React, { Component } from "react";
import io from "socket.io-client";


class Socket extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "" // Change this to server end point. change this when deploy to heroku
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = io.connect(endpoint);// this is connecting to the socket from the server.
    // this is the first call to the server to set up the socket
    socket.on("mathproblem", data => 
    this.setState({ response: data }));
  }
  
  render() {
    const { response } = this.state;
    return (
        <div style={{ textAlign: "center" }}>
          {response
              ? <div>
                  {/* mapping the 10 responses from the DB */}
                {response.map(item => <p key={item.id}>{item.problem}</p>)}
              </div>
              : <p>Loading... or socket failed wait 10 sec.</p>}
        </div>
    );
  }
}

export default Socket;