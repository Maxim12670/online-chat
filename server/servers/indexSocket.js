const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const friendRouter = require('../routes/friend.router');
const PORT = process.env.PORT || 5001;

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());
app.use('/api/friend', friendRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"]
  }
});

server.listen(PORT, () => {
  console.log(`socket server is running on post ${PORT}`);
});
