import React, { Component } from "react";
import io from "socket.io-client";
import logo from "../../images/fibbage.png";
import "./Lobby.css";

export default class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: "",
      gameStarted: false,
      players: [
        { name: "Login to Play!" },
        { name: "Login to Play!" },
        { name: "Login to Play!" },
        { name: "Login to Play!" },
        { name: "Login to Play!" },
        { name: "Login to Play!" },
        { name: "Login to Play!" },
        { name: "Login to Play!" }
      ]
    };
    this.socket = io.connect(":4762");
    this.socket.on("player joined", data => this.playerJoined(data));
    this.socket.on("the game is starting", this.startGame);
  }

  componentDidMount() {
    this.createRoom();
  }

  playerJoined = newPlayerName => {
    // // filter the array that says player and the first one that it matches with get the index, then splice it and then setState with the new information.
    let players = this.state.players.slice();
    let playerIndex = players.findIndex(
      player =>
        player.name.includes("Login to Play!") || player.name === newPlayerName
    );
    if (players[playerIndex].name !== newPlayerName && playerIndex !== -1) {
      players[playerIndex] = { name: newPlayerName, id: playerIndex, score: 0 };
      this.setState({
        players: players
      });
    }
  };
  startGame = () => {
      this.setState({gameStarted: true})
  }
  createRoom = () => {
    // a function that creates a random code and connects to sockets
    let roomcode = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < 4; i++) {
      roomcode += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.setState({
      room: roomcode
    });
    this.socket.emit("create room", { room: roomcode });
  };

  render() {
    let newplayers = this.state.players.map((player, index) => {
        return (
          <div key={index}>
            <h2>{player.name}</h2>
          </div>
        );
    });
    return (
      <div className="lobby">
      { this.state.gameStarted ?
      <div>Question 1</div>
      :
        <div>
        <img src={logo} style={{ width: "300px" }} alt="" />
        <h2>Press everybody's in to start the game.</h2>
        <h2>Join on your phone or tablet at www.fibbagi.com/join</h2>
        <h2>Your room code is: {this.state.room}</h2>
        <div>{newplayers}</div>
        </div>


      }
      </div>
    );
  }
}
