const Router = require('express');
const router = new Router();
const refreshToken = require('../controller/refreshToken.controller');

router.post('/refresh', refreshToken.refreshToken);

module.exports = router;