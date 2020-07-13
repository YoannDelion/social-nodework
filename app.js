const express = require('express')
const bodyParser = require('body-parser') // Extract JSON Object from requests
const mongoose = require('mongoose') // Mongoose helps communicate with MongoDB database

const postRoutes = require('./routes/post') // Retrieve post routes

const app = express()

// MongoDB connection config
mongoose.connect('mongodb+srv://yoanndelion:sWMUZ8bxdhiWb4RE@social-nodework.i7v5o.mongodb.net/<dbname>?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'))

// Handle CORS error
app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

// Define json() function has a global middleware
app.use(bodyParser.json())

app.use('/api/posts', postRoutes)

module.exports = app