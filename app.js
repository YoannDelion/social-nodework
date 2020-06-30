const express = require('express')
// Extract JSON Object from requests
const bodyParser = require('body-parser')
// Mongoose helps communicate with MongoDB database
const mongoose = require('mongoose')

const Post = require('./models/post')
const { response } = require('express')

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

/**
 * Add new Post to database
 */
app.post('/api/posts', (request, response, next) => {
    const post = new Post({
        ...request.body
    })
    post.save()
        .then(() => response.status(201).json({ message: 'Post saved!' }))
        .catch(error => response.status(400).json({ error }))
})

/**
 * Retrieve one Post object from its id 
 */
app.get('/api/post/:id', (request, response, next) => {
    Post.findById(request.params.id)
        .then(post => response.status(200).json(post))
        .catch(error => response.status(404).json({ error }))
})

/**
 * Update a Post object from its id
 */
app.put('/api/post/:id', (request, response, next) => {
    Post.updateOne({ _id: request.params.id }, { ...request.body, _id: request.params.id })
        .then(() => response.status(200).json({ message: 'Post updated successfully!' }))
        .catch(error => response.status(400).json({ error }))
})

/**
 * Retrieve all Posts from database
 */
app.use('/api/posts', (request, response, next) => {
    Post.find()
        .then(posts => response.status(200).json(posts))
        .catch(error => response.status(400).json({ error }))
})

module.exports = app