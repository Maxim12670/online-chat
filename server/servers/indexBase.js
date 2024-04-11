const express = require('express');
const userRouter = require('../routes/user.routes');
const postRouter = require('../routes/post.routers');
// const friendRouter = require('../routes/friend.router'); 
const cors = require('cors');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
const baseURL = "*";
const app = express();
app.use(express.json());

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
// app.use('/api/friend', friendRouter);

app.listen(PORT, () => {
  console.log(`base server is running on port ${PORT}`);
});
