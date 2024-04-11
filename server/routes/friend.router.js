const Router = require('express');
const router = new Router();
const friendcontroller = require('../controller/friend.controller');

router.post('/request', friendcontroller.sendRequestToFriends)
router.put('/answer', friendcontroller.answerFriendRequest)
router.post('/remove', friendcontroller.removeFromFriends)


module.exports = router;