const express = require('express')
// Extract JSON Object from requests
const bodyParser = require('body-parser')

const app = express()

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
    console.log(request.body)
    response.status(201).json({
        message: 'Post created!'
    })
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