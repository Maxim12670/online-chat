const Router = require('express');
const router = new Router();
const messageController = require('../controller/message.controller');

router.post('/new', messageController.createMessage);
router.get('/messages', messageController.getAllMessageDialog);

module.exports = router;