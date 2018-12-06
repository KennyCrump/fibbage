import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import logo from '../images/fibbage.png'


export default class Home extends Component {
    constructor(props){
        super(props)

    }

    // a function that creates a random code and connects to sockets
    


    render(){
        return(
            <div>
                <img src={logo} style={{width: '400px', marginTop: '20px'}} alt=""/>
                <br/>

                <Link to='/lobby'><button>Start Game</button></Link>
                <Link to='/join'><button>Join a Game</button></Link>



            </div>
        )
    }
}