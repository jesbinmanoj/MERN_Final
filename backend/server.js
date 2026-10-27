const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const recipeRoutes = require('./routes/recipeRoutes');

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors({
  origin: '*', // Allow frontend development ports (5173, 3000, etc.)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger in development
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// API Routes
app.use('/api/recipes', recipeRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Recipe Book Backend API is up and running',
    timestamp: new Date().toISOString()
  });
});

// Root welcome message
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Recipe Book API</title></head>
      <body style="font-family: system-ui, -apple-system, sans-serif; padding: 2rem; background: #fafaf9; color: #1c1917;">
        <h1>🍳 Recipe Book API Server</h1>
        <p>The backend REST API is actively listening on port <strong>${PORT}</strong>.</p>
        <p>Available Endpoints:</p>
        <ul>
          <li><code>GET /api/recipes</code> - List all recipes</li>
          <li><code>POST /api/recipes</code> - Create a new recipe</li>
          <li><code>GET /api/recipes/:id</code> - Get details of a single recipe</li>
          <li><code>PUT /api/recipes/:id</code> - Update a recipe</li>
          <li><code>DELETE /api/recipes/:id</code> - Remove a recipe</li>
          <li><code>GET /api/health</code> - API Status Check</li>
        </ul>
      </body>
    </html>
  `);
});

// 404 Not Found Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Resource not found for ${req.method} ${req.originalUrl}`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Server Error]:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error occurred',
    error: err.message
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Recipe Book Server running on http://localhost:${PORT}`);
});
