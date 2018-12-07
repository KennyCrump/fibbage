import React, { Component } from "react";
import io from "socket.io-client";

export default class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomcode: "",
      name: "",
      modal: false
    };
    this.socket = io.connect(":4762");
  }

  // a function that creates a random code and connects to sockets

  handleRoom = val => {
    this.setState({
      roomcode: val.toUpperCase()
    });
  };

  handleName = val => {
    this.setState({
      name: val.toUpperCase()
    });
  };

  submit = () => {
    let { roomcode, name } = this.state;
    if (name) {
      this.socket.emit("joined game", { room: roomcode, name });
      this.setState({ modal: true });
    } else {
      alert("Please Enter a Name to Join");
    }
  };

  render() {
    console.log(this.state.roomcode);
    console.log(this.state.name);
    return (
      <div>
        <input
          placeholder="Type in Game Code"
          maxLength="4"
          onChange={e => this.handleRoom(e.target.value)}
          type="text"
        />
        <input
          placeholder="Type in Name"
          onChange={e => this.handleName(e.target.value)}
          type="text"
        />
        <button onClick={this.submit}>Play</button>
        {
          <div className="waitingToStart">
            <div className="modal">
            
            </div>
          </div>
        }
      </div>
    );
  }
}
