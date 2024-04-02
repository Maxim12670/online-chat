const Router = require('express');
const router = new Router();
const userController = require('../controller/user.controller');
const { check } = require('express-validator');



router.post('/registr', [
  check('password', 'Пароль должен быть от 3 до 10 символов!').isLength({ min: 3, max: 10 }),
  (res, req, next) => {
    res.status(401).json({ message: 'ты не авторизован' });
    туче()
  }
], userController.createUser);
router.post('/auth', userController.authUser)
router.get('/:id', userController.getByUser);
router.get('/users', userController.getAllUsers);
router.put('/', userController.updateUser);
router.post('/:id', userController.deleteUser);


module.exports = router;