/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user (requires access code which can be requested from the developer)
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, accesscode]
 *             properties:
 *               email:
 *                 type: string
 *                 example: ""
 *               password:
 *                 type: string
 *                 example: ""   
 *               accessCode:
 *                 type: string
 *                 example: ""
 *     responses:
 *       201:
 *         description: User registered
 *       403:
 *         description: Invalid access code
 *       409:
 *         description: Email already registered
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login and receive JWT token
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: ""
 *               password:
 *                 type: string
 *                 example: ""
 *     responses:
 *       200:
 *         description: Token returned
 */


import express from 'express';
import { login, register } from '../controllers/auth.controller.js';

// Create a new router instance
const router = express.Router();

// Define the routes for authentication
// POST /auth/register - Register a new user
router.post('/register', register);

// POST /auth/login - Login and receive JWT token
router.post('/login', login);

// Export the router to be used in other parts of the application
export default router;
