const Router = require('express');
const router = new Router();
const userController = require('../controller/user.controller');
const { check } = require('express-validator');

router.post('/user', [
check('password', 'Пароль должен быть от 3 до 10 символов!').isLength({min: 3, max: 10})
], userController.createUser);
router.get('/user/:id', userController.getUser);
router.get('/user', userController.getAllUsers);
router.put('/user', userController.updateUser);
router.post('/user/:id', userController.deleteUser);


module.exports = router;