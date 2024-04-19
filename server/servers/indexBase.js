const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const multer = require('multer');
const userRouter = require('../routes/user.routes');
const postRouter = require('../routes/post.routers');
const PORT = process.env.PORT || 5000;
const baseURL = "*";

const upload = multer();
const app = express();

app.use(upload.any());
app.use(express.json({ extended: true }));
app.use('/images', express.static(path.join(__dirname, '../images')));

app.use(
  cors({
    credentials: true,
    baseURL,
    origin: true
  })
);

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,token");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(cookieParser());
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);

app.listen(PORT, () => {
  console.log(`base server is running on port ${PORT}`);
});