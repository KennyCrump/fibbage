import React from 'react'
import {Switch, Route } from 'react-router-dom'

import Home from './Components/Home'
import Lobby from './Components/Lobby/Lobby'
import Join from './Components/Join/Join'

export default <Switch>
    <Route exact path='/' component={Home}/>
    <Route path='/lobby' component={Lobby}/>
    <Route path='/join' component={Join}/>
</Switch>