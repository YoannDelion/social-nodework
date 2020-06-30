const express = require('express')

const app = express()

// Next method allows middleware to pass execution to the next middleware
// app.use((request, response, next) => {
//     console.log('Request received')
//     next()
// })

// app.use((request, response, next) => {
//     response.status(201)
//     next()
// })

// app.use((request, response, next) => {
//     response.json({ message: 'Request well received' })
//     next()
// })

// app.use((request, response, next) => {
//     console.log('Response send successfully')
// })

// Handle CORS error
app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
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