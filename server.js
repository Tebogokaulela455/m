// server/server.js

require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
const http       = require('http');
const socketIo   = require('socket.io');
const connectDB  = require('./config/db');

const authRoutes    = require('./routes/auth');
const courseRoutes  = require('./routes/courses');
const bookingRoutes = require('./routes/bookings');

const app    = express();
const server = http.createServer(app);
const io     = socketIo(server, { cors: { origin: '*' } });

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/bookings', bookingRoutes);

// Real-time chat
io.on('connection', socket => {
  console.log('New client connected');
  socket.on('message', msg => io.emit('message', msg));
  socket.on('disconnect', () => console.log('Client disconnected'));
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
