const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const entriesRoutes = require('./routes/entries');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/entries', entriesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});