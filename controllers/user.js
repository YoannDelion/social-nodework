const bcrypt = require('bcrypt')
const User = require('../models/user')

/**
 * Hash password and then sign up a user    
 */
exports.signup = (request, response, next) => {
    bcrypt.hash(request.body.password, 10)
        .then(hash => {
            const user = new User({
                ...request.body,
                password: hash
            })

            user.save()
                .then(() => response.status(201).json({ message: 'User created!' }))
                .catch(error => response.status(400).json({ error }))
        })
        .catch(error => response.status(500).json({ error }))
}

/**
 * Log a user in 
 */
exports.login = (request, response, next) => { }