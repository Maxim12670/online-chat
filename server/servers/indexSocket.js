const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');


const friendRouter = require('../routes/friend.router');
const dialogRouter = require('../routes/dialog.router');
const messageRouter = require('../routes/message.router');

const PORT = process.env.PORT || 5001;
const baseURL = "*";

const app = express();

app.use(cors({
  baseURL,
  credentials: true,
  origin: true
}));

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,token");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
app.use('/api/friend', friendRouter);
app.use('/api/dialog', dialogRouter);
app.use('/api/message', messageRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});


io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('sendMessage', (msg) => {
    io.emit('server found your message:', msg);
    console.log('this is object msg:', msg);
    
  });

  // socket.on('sendMessage', (msg) => {
  //   io.emit('server found your message:', msg);
  // });

  socket.on('disconnected', () => {
    console.log('User disconnect');
  })
})


server.listen(PORT, () => {
  console.log(`socket server is running on port ${PORT}`);
});