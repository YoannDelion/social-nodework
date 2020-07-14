const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const postController = require('../controllers/post')

router.post('/', auth, postController.createPost)
router.get('/:id', auth, postController.getOnePost)
router.put('/:id', auth, postController.updatePost)
router.delete('/:id', auth, postController.deletePost)
router.get('/', auth, postController.getAllPosts)

module.exports = router