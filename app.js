const express = require('express')
const { response } = require('express')

const app = express()

app.use((request, response) => {
    response.json({ message: 'Server response from express' })
})

module.exports = app