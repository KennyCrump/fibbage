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
    }

    componentDidMount(){
        if(!this.state.room){
            this.createRoom()
        } 
        this.socket.on('players joined', data => this.playersJoined(data))
        // this.joinRoom()
    }


    playersJoined = (data)=>{
        let players = [...this.state.players]
        players.push(data.name)
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
        console.log(this.state.room)
        let newplayers = this.state.players.map( ()=>{

        })
        return(
            <div>
                <p>Logo</p>
                <h2>Join using code:{this.state.room}</h2>
                {this.state.players[0]}

            </div>
        )
    }
}