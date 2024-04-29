const Router = require('express');
const router = new Router();
const dialogRoomController = require('../controller/dialog_room.controller');

router.post('/add', dialogRoomController.createDialog)
router.get('/all', dialogRoomController.getAllDialogsUser)


module.exports = router;