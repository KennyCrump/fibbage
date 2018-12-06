import React, { Component } from 'react'
import io from 'socket.io-client'
import logo from '../../images/fibbage.png'
import './Lobby.css'


export default class Lobby extends Component {
    constructor(props) {
        super(props)
        this.state = {
            room: '',
            players: ['Login to Play!', 'Login to Play!', 'Login to Play!', 'Login to Play!', 'Login to Play!', 'Login to Play!', 'Login to Play!', 'Login to Play!'],

        }
        this.socket = io.connect(':4762')
        this.socket.on('player joined', data => this.playerJoined(data))
    }

    componentDidMount() {
        if (!this.state.room) {
            this.createRoom()
        }
        // this.socket.on('player joined', data => this.playerJoined(data))
        // this.joinRoom()
    }


    playerJoined = (data) => {
        console.log(data) //data = new player that joined
        let {players} = this.state
        let filteredPlayers = players.filter(element => element = 'Login to Play!')
        console.log(filteredPlayers)
        let playerindex = filteredPlayers.findIndex(element => element = 'Login to Play!')
        // it saves as 0 only.
        console.log(playerindex)
        let newplayers = [...players]
        newplayers.splice(playerindex, 1, data)
        // filter the array that says player and the first one that it matches with get the index, then splice it and then setState with the new information.
        // let players = this.state.players.slice()
        let playerIndex = players.findIndex((player) => player.includes('Login'))
        
        players[playerIndex] =  data
        this.setState({
            players: newplayers
        })

    }

    createRoom = () => {
        // a function that creates a random code and connects to sockets
        let roomcode = ''
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for (let i = 0; i < 4; i++) {
            roomcode += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        this.setState({
            room: roomcode
        })
        this.socket.emit('create room', { room: roomcode })
    }

    render() {
        let newplayers = this.state.players.map((player, index) => {
            return (
                <div key={index}>
                    <h2>{player}</h2>
                </div>
            )
        })
        return (
            <div className='lobby'>
                <div >
                    <img src={logo} style={{ width: '300px' }} alt="" />
                    <h2>Press everybody's in to start the game.</h2>
                    <h2>Join on your phone or tablet at www.fibbagi.com/join</h2>
                    <h2>Your room code is: {this.state.room}</h2>
                </div>
                <div>
                    {newplayers}
                </div>
            </div>
        )
    }
}