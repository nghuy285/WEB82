import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import crypto from 'crypto';
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ userName, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Requires email and password' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const randomString = crypto.randomUUID();
    const apiKey = `mern-$${user._id}$-$${email}$-$${randomString}$`;

    user.apiKey = apiKey;
    await user.save();

    res.json({ apiKey });
  } catch (err) {
    res.status(500).json({ message: 'Requires email and password' });
  }
};
export {loginUser, registerUser};