const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const postController = require('../controllers/post')

router.post('/', auth, multer, postController.createPost)
router.get('/:id', auth, postController.getOnePost)
router.put('/:id', auth, multer, postController.updatePost)
router.delete('/:id', auth, postController.deletePost)
router.get('/', auth, postController.getAllPosts)

module.exports = router