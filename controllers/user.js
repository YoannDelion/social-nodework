const bcrypt = require('bcrypt')
const User = require('../models/user')

/**
 * Hash password and then sign up a user    
 */
exports.signup = (request, response, next) => {
    bcrypt.hash(request.body.password, 10)
        .then(hash => {
            const user = new User({
                email: request.body.email,
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
exports.login = (request, response, next) => {
    User.findOne({ email: request.body.email })
        .then(user => {
            if (!user) return response.status(401).json({ error: 'Invalid credentials!' })
            bcrypt.compare(request.body.password, user.password)
                .then(valid => {
                    if (!valid) return response.status(401).json({ error: 'Invalid credentials!' })
                    response.status(200).json({
                        userId: user._id,
                        token: 'TOKEN'
                    })
                })
                .catch(error => response.status(500).json({ error }))
        })
        .catch(error => response.status(500).json({ error }))
}