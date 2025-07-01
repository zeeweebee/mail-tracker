// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
const { pool } = require('../utils/db');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [decoded.userId]);
    if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid token' });
    req.user = result.rows[0];
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

const requireAdmin = (req, res, next) => {
  if (!req.user.is_admin) return res.status(403).json({ error: 'Admin access required' });
  next();
};

module.exports = { authenticateToken, requireAdmin };
