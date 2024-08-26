import User from '../models/user.js';

const authMiddleware = async (req, res, next) => {
  const { apiKey } = req.query;

  if (!apiKey) {
    return res.status(400).json({ message: 'apiKey is required' });
  }

  const parts = apiKey.split('-$');
  if (parts.length !== 4 || parts[0] !== 'mern') {
    return res.status(400).json({ message: 'Invalid apiKey format' });
  }

  const userId = parts[1];
  const email = parts[2];

  const user = await User.findById(userId);
  if (!user || user.email !== email || user.apiKey !== apiKey) {
    return res.status(401).json({ message: 'Invalid apiKey' });
  }

  req.user = user;
  next();
};


export default authMiddleware;
