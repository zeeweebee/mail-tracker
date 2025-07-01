// backend/utils/groupHelper.js
const { pool } = require('./db');

const assignNextGroup = async (userId) => {
  try {
    const result = await pool.query('SELECT assign_next_group($1) as group_id', [userId]);
    return result.rows[0].group_id;
  } catch (error) {
    console.error('Error assigning group:', error);
    return null;
  }
};

module.exports = { assignNextGroup };
