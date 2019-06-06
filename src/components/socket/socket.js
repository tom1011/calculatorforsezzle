import React, { Component } from "react";
import io from 'socket.io-client';

// socket component
const socket = io.connect({
    secure: false,
    transports: ['websocket'],
    upgrade: false,
});
// end socket component

class Socket extends Component {
    constructor() {
        super();
        this.state = {
            response: [],
        };
        // initial handshake for socket.
        socket.on("mathproblem", data =>
            this.setState({ response: data })
        );
    }

    render() {
        const { response } = this.state;
        return (
            <div style={{ textAlign: "center" }}>
                {response
                    ? <div>
                        {/* mapping the 10 responses from the server*/}
                        {response.map((item, index) => <p key={index}>{item}</p>)}
                    </div>
                    : <p>Loading... or socket failed wait 10 sec.</p>}
            </div>
        );
    }
}

export default Socket;