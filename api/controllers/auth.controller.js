import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
}

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Wrong credentials' });
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    
    const { password: pass, ...rest } = validUser._doc;
    res.cookie('access_token', token, { httpOnly: true })
    .status(200).json(rest);
  } catch (error) {
    next(error);
  }
}
