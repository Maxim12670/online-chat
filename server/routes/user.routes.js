const Router = require('express');
const router = new Router();
const userController = require('../controller/user.controller');
const { check } = require('express-validator');
const fileMiddleware = require('../middleware/upload');


router.post('/registr', [
  check('password', 'Пароль должен быть от 3 до 10 символов!').isLength({ min: 3, max: 10 }),
  (res, req, next) => {
    res.status(401).json({ message: 'ты не авторизован' });
    next();
  }
], userController.createUser);


router.post('/auth', userController.authUser)
router.post('/user', userController.getUserData);
router.get('/users', userController.getAllUsers);


// router.post('/update', fileMiddleware.single('image'), userController.updateUser);

router.post('/update', (req, res, next) => {
  console.log('body data', req.body)
  console.log('3333333', req.files[0].originalname)
  if(!req.files) {
    console.log('файла не было!');
    return next();
  }
  console.log('мой файлик:', req.files[0]);
  fileMiddleware.single('image');
}, userController.updateUser);

router.post('/:id', userController.deleteUser);


module.exports = router;