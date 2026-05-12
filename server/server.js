const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Minimal Middleware for debugging
app.use(cors({ origin: '*' })); // Explicitly allow all
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.url}`);
  next();
});

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🚀 MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Pass io to routes
app.set('socketio', io);

// Basic Route
app.get('/', (req, res) => {
  res.json({ message: 'API is running...' });
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const issueRoutes = require('./routes/issueRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/issues', issueRoutes);

// Detailed Error Handling
app.use((err, req, res, next) => {
  console.error('🔥 Global Error Handler:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: err.stack
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
