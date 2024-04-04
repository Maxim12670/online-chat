const Router = require('express');
const router = new Router();
const postController = require('../controller/post.controller');

router.post('/add/:userId', postController.createPost)
router.post('/delete', postController.deletePost)
router.get('/posts', postController.getAllPost)

module.exports = router;