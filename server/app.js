const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const connectDb = require('./config/db');
const router = require('./routes/index');
const http = require('http');
const server = http.createServer(app);
const errorHandler = require('./middlewares/errorHandler');

const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// socket
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('send chat', (payload) => {
    console.log(payload);
    socket.emit('send chat', { ...payload, sender: true });
    socket.broadcast.emit('send chat', { ...payload, sender: false });
  });
});

// config and middlewares
connectDb();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use(errorHandler);

module.exports = server;
