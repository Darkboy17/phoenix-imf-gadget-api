import express from 'express';
import cors from 'cors';
import gadgetRoutes from './routes/gadgets.js';
import authRoutes from './routes/auth.js';
import morgan from 'morgan';

// create express app
const app = express();

// Middleware to log requests to the console
app.use(morgan('dev')); // or 'combined' for more detail

// allow all origins
app.use(cors());

// parse JSON bodies
app.use(express.json());

// route for gadgets
app.use('/gadgets', gadgetRoutes);

// route for authentication
app.use('/auth', authRoutes);

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

// Root route
app.get('/', (req, res) => {
    res.send(
        { 'message': 'Welcome to Phoenix: IMF Gadget API!' });
});

export default app;