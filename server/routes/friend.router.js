const Router = require('express');
const router = new Router();
const friendController = require('../controller/friend.controller');

router.post('/request', friendController.sendRequestToFriends)
router.put('/answer', friendController.answerFriendRequest)
router.post('/remove', friendController.removeFromFriends)
router.post('/friends', friendController.getFriends)
router.post('/followers', friendController.getFollowers)
router.post('/subscriptions', friendController.getSubscriptions)


module.exports = router;