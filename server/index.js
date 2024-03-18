const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRouter');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use('/auth', authRouter);

const start = async () => {
  try {
    await mongoose.connect('mongodb+srv://qwerty:qwerty123@chat-online.vgezvet.mongodb.net/?retryWrites=true&w=majority&appName=chat-online')
    app.listen(PORT, () => {
      console.log(`Server start, PORT: ${PORT}`);
    })
  } catch (e) {
    console.log(e);
  }
}

start()