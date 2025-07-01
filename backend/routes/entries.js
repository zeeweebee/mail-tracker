// backend/routes/entries.js
const express = require('express');
const { pool } = require('../utils/db');
const { authenticateToken } = require('../middleware/auth');
const { assignNextGroup } = require('../utils/groupHelper');

const router = express.Router();

// all /api/entries/... endpoints here (copy from your `server.js` as-is)

module.exports = router;
