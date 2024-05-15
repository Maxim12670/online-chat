const Router = require('express');
const router = new Router();
const userController = require('../controller/user.controller');
const { check } = require('express-validator');
const fileMiddleware = require('../middleware/upload');
const verifyRefreshToken = require('../utils/verifyRefreshToken');


router.post('/registr', [
  check('password', 'Пароль должен быть от 3 до 10 символов!').isLength({ min: 3, max: 10 }),
  (res, req, next) => {
    res.status(401).json({ message: 'ты не авторизован' });
    next();
  }
], userController.createUser);

router.post('/auth', userController.authUser);
router.post('/logout',verifyRefreshToken, userController.logout);
router.post('/user', verifyRefreshToken, userController.getUserData);
router.get('/users', userController.getAllUsers);
router.post('/update', fileMiddleware.single('image'), userController.updateUser);
router.post('/:id', userController.deleteUser);


module.exports = router;