import React, { Component } from "react";
import io from "socket.io-client";
import axios from "axios";

export default class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: "",
      name: "",
      modal: false
    };
    this.socket = io.connect(":4762");
  }

  // a function that creates a random code and connects to sockets
  componentDidMount() {
    axios
      .get("/api/session")
      .then(res => {
        console.log(res.data);
        if (res.data.room && res.data.name) {
          this.socket.emit("joined game", {
            room: res.data.room,
            name: res.data.name
          });
        }
      })
  }
  handleRoom = val => {
    this.setState({
      room: val.toUpperCase()
    });
  };

  handleName = val => {
    this.setState({
      name: val.toUpperCase()
    });
  };
  modalToggle = () => {
    this.setState(prevState => {
      return { modal: !prevState.modal };
    });
  };

  join = () => {
    let { room, name } = this.state;
    if (name) {
      this.socket.emit("joined game", { room: room, name });
      axios
        .post("/api/session", { name: this.state.name, room: this.state.room })
        .then(res => {
          this.modalToggle();
        });
    } else {
      alert("Please Enter a Name to Join");
    }
  };
  startGame = () => {
    let { room } = this.state;
    this.socket.emit("start game", { room });
  };

  render() {
    console.log(this.state.room);
    console.log(this.state.name);
    return (
      <div>
        {this.state.modal ? (
          <div className="waitingToStart">
            <div className="modal">
              <button onClick={this.modalToggle}>Edit Information</button>
              <button onClick={this.startGame}>Everybody's In</button>
            </div>
          </div>
        ) : (
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
            <button onClick={this.join}>Join</button>
          </div>
        )}
      </div>
    );
  }
}
