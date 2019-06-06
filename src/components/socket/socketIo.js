import React, { Component } from "react";
import io from 'socket.io-client';

const ROOT_URL = 'wss://livesimplecalculator.herokuapp.com/'; // defaults to base url. that should be right

const socket = io.connect(ROOT_URL, {
    secure: true,
    transports: ['websocket'],
    upgrade: false,
});

class Socket extends Component {
    constructor() {
        super();
        this.state = {
            response: [],
        };
        socket.on("mathproblem", data =>
            this.setState({ response: data })
        );
    }

    componentDidMount() {
        // this is connecting to the socket from the server.
        // this is the first call to the server to set up the socket

    }
    render() {
        const { response } = this.state;
        return (
            <div style={{ textAlign: "center" }}>
                {response
                    ? <div>
                        {/* mapping the 10 responses from the DB */}
                        {response.map((item, index) => <p key={index}>{item}</p>)}
                    </div>
                    : <p>Loading... or socket failed wait 10 sec.</p>}
            </div>
        );
    }
}

export default Socket;