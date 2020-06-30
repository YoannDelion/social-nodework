const express = require('express')
// Extract JSON Object from requests
const bodyParser = require('body-parser')
// Mongoose helps communicate with MongoDB database
const mongoose = require('mongoose')

const Post = require('./models/post')

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

app.post('/api/posts', (request, response, next) => {
    const post = new Post({
        ...request.body
    })
    post.save()
        .then(() => response.status(201).json({ message: 'Post saved!' }))
        .catch(error => response.status(400).json({ error }))
})

app.use('/api/posts', (request, response, next) => {
    const posts = [
        {
            _id: 'oeihfzeoi',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa expedita blanditiis in porro delectus explicabo facere sit, perspiciatis architecto quasi temporibus nam repellat recusandae error et excepturi ullam, laborum ex.',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            userId: 'qsomihvqios',
        },
        {
            _id: 'oeihfzeomoihi',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa expedita blanditiis in porro delectus explicabo facere sit, perspiciatis architecto quasi temporibus nam repellat recusandae error et excepturi ullam, laborum ex.',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            userId: 'qsomihvqios',
        },
    ]
    response.status(200).json(posts)
})

module.exports = app