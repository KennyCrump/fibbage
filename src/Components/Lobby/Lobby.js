import React, {Component} from 'react'
import io from 'socket.io-client'


export default class Lobby extends Component {
    constructor(props){
        super(props)
        this.state={
            room: '',
            players: ['Michael'],
            
        }
        this.socket = io.connect(':4762')
        this.socket.on('player joined', data => this.playerJoined(data))
    }

    componentDidMount(){
        if(!this.state.room){
            this.createRoom()
        } 
        // this.socket.on('player joined', data => this.playerJoined(data))
        // this.joinRoom()
    }


    playerJoined = (data) =>{
        console.log(data) //data = new player that joined
        let players = [...this.state.players, data]
        this.setState({
            players
        })

    }

    createRoom = () =>{
        // a function that creates a random code and connects to sockets
        let roomcode = ''
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for(let i = 0; i<4; i++){
            roomcode += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        this.setState({
            room:roomcode
        })
        this.socket.emit('create room', {room: roomcode})
    }
    
    render(){
        console.log(this.state.room, this.state.players)
        let newplayers = this.state.players.map( (player, index)=>{
            return (
                <div key={index}>
                    <h2>{player}</h2>
                </div>
            )
        })
        return(
            <div>
                <p>Logo</p>
                <h2>Join using code:{this.state.room}</h2>
                {newplayers}

            </div>
        )
    }
}