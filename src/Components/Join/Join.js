import React, {Component} from 'react'
import io from 'socket.io-client'


export default class Join extends Component {
    constructor(props){
        super(props)
        this.state={
            roomcode: '',
            name: ''
        }
        this.socket = io.connect(':4762')
    }

    // a function that creates a random code and connects to sockets
    
    handleRoom = (val)=>{
        this.setState({
            roomcode: val
        })
    }
    
    handleName = (val)=>{
        this.setState({
            name: val
        })
    }

    submit = ()=>{
        let {roomcode, name} = this.state
        this.socket.emit('joined game', {room: roomcode, name})
    }

    render(){
        console.log(this.state.roomcode)
        console.log(this.state.name)
        return(
            <div>
               <input placeholder='Type in Game Code' onChange={(e)=>this.handleRoom(e.target.value)} type="text"/>
               <input placeholder='Type in Name' onChange={(e)=>this.handleName(e.target.value)} type="text"/>
               <button onClick={this.submit}>Play</button>

            </div>
        )
    }
}