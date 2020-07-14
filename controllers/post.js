const Post = require('../models/post')

/**
 * Add new Post to database
 */
exports.createPost = (request, response, next) => {
    const postObject = JSON.parse(request.body.post)
    delete postObject._id

    const post = new Post({
        ...postObject,
        imageUrl: `${request.protocol}://${request.get('host')}/images/${request.file.filename}`
    })

    post.save()
        .then(() => response.status(201).json({ message: 'Post saved!' }))
        .catch(error => response.status(400).json({ error }))
}

/**
 * Retrieve one Post object from its id 
 */
exports.getOnePost = (request, response, next) => {
    Post.findById(request.params.id)
        .then(post => response.status(200).json(post))
        .catch(error => response.status(404).json({ error }))
}

/**
 * Update a Post object from its id
 */
exports.updatePost = (request, response, next) => {
    const postObject = request.file ?
        {
            ...JSON.parse(request.body.post),
            imageUrl: `${request.protocol}://${request.get('host')}/images/${request.file.filename}`
        } : { ...request.body }

    Post.updateOne({ _id: request.params.id }, { ...postObject, _id: request.params.id })
        .then(() => response.status(200).json({ message: 'Post updated successfully!' }))
        .catch(error => response.status(400).json({ error }))
}

/**
 * Delete a Post object from its id
 */
exports.deletePost = (request, response, next) => {
    Post.deleteOne({ _id: request.params.id })
        .then(() => response.status(200).json({ message: 'Post deleted' }))
        .catch(error => response.status(400).json({ error }))
}

/**
* Retrieve all Posts from database
*/
exports.getAllPosts = (request, response, next) => {
    Post.find()
        .then(posts => response.status(200).json(posts))
        .catch(error => response.status(400).json({ error }))
}