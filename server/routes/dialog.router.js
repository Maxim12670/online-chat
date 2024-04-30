const Router = require('express');
const router = new Router();
const dialogRoomController = require('../controller/dialog_room.controller');

router.post('/create', dialogRoomController.createDialog)
router.get('/dialogs', dialogRoomController.getAllDialogsUser)


module.exports = router;