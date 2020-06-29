const express = require('express')

const app = express()

// Next method allows middleware to pass execution to the next middleware
app.use((request, response, next) => {
    console.log('Request received')
    next()
})

app.use((request, response, next) => {
    response.status(201)
    next()
})

app.use((request, response, next) => {
    response.json({ message: 'Request well received' })
    next()
})

app.use((request, response, next) => {
    console.log('Response send successfully')
})

module.exports = app