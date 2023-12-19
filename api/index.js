import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

// Error handling middleware (Should be placed after all routes)
app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    });
    console.log('Connected to MongoDB!');
    app.listen(3000, () => {
      console.log('Server is running on port 3000!');
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

startServer();
