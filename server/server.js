const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 3000
const {MONGOURI} = require('./keys')

require('./models/user')

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Connected to Mongo')
})

mongoose.connection.on('error', (err) => {
    console.log('Error Connecting ', err)
})

const customMiddleware = (req, res, next) => {
    console.log('middleware executed')
    next()
}

app.get('/', (req, res) => {
    res.send("hello World")
})

app.listen(PORT, () => {
    console.log('Server is running on ', PORT)
})