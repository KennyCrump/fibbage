require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const axios = require('axios')
const app = express()

app.use(express.json())

massive(CONNECTION_STRING).then((db) => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => {
      console.log(`server running on port ${SERVER_PORT}`)
    })
  })