const Post = require('../models/post')

/**
 * Add new Post to database
 */
exports.createPost = (request, response, next) => {
    const post = new Post({ ...request.body })

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
    const post = new Post({ _id: request.params.id, ...request.body })

    Post.updateOne({ _id: request.params.id }, post)
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