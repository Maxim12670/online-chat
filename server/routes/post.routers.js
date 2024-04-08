const Router = require('express');
const router = new Router();
const postController = require('../controller/post.controller');

router.post('/add', postController.createPost)
router.post('/delete', postController.deletePost)
router.post('/posts', postController.getAllPost)

module.exports = router;