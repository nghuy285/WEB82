import User from '../models/user.js';

const authMiddleware = async (req, res, next) => {
  try {
    const { apiKey } = req.query;

    if (!apiKey) {
      return res.status(400).json({ message: 'apiKey is required' });
    }

    const parts = apiKey.split('$').filter(part => part);
    const cleanParts = parts.map(part => part.replace(/^-+|-+$/g, '')).filter(part => part);

    if (cleanParts.length !== 4 || cleanParts[0] !== 'mern') {
      return res.status(400).json({ message: 'Invalid apiKey format' });
    }

    const [prefix, userId, email, randomString] = cleanParts;
    
    const user = await User.findById(userId);
    if (!user || user.email !== email || user.apiKey !== apiKey) {
      return res.status(401).json({ message: 'Invalid apiKey' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default authMiddleware;
