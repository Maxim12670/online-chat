const Router = require('express');
const router = new Router();
const friendController = require('../controller/friend.controller');

router.post('/request', friendController.sendRequestToFriends)
router.put('/answer', friendController.answerFriendRequest)
router.post('/remove', friendController.removeFromFriends)
router.get('/friends', friendController.getFriends)
router.get('/followers', friendController.getFollowers)
router.get('/subscriptions', friendController.getSubscriptions)


module.exports = router;