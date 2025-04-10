
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Load environment variables from .env file
dotenv.config();

// Initialize Prisma Client
const prisma = new PrismaClient();

export const register = async (req, res) => {

  // Check if the request body contains all required fields
  const { email, password, accessCode } = req.body;

  if (!email || !password || !accessCode) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Check access code
  if (accessCode !== process.env.ACCESS_CODE) {
    return res.status(403).json({ error: "Invalid access code" });
  }

  // Check if the email is already registered
  const existing = await prisma.user.findUnique({ where: { email } });

  // If the email is already registered, return a 409 Conflict response
  if (existing) {
    return res.status(409).json({ error: "Email already registered" });
  }

  // Hash the password before storing it in the database
  // Use bcrypt to hash the password with a salt rounds of 10
  const hash = await bcrypt.hash(password, 10);

  // Create a new user in the database
  // Use Prisma to create a new user with the hashed password
  const user = await prisma.user.create({ data: { email, password: hash } });

  // Return a 201 Created response with the user data
  res.status(201).json({ message: 'User registered', user });// 
};

export const login = async (req, res) => {

  // Check if the request body contains all required fields
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Check if the user exists in the database
  const user = await prisma.user.findUnique({ where: { email } });

  // If the user does not exist, return a 401 Unauthorized response
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: 'Invalid credentials' });

  // Generate a JWT token for the user
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  // Return a 200 OK response with the token
  res.json({ token });
};