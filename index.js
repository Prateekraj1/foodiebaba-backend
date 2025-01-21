const express = require('express');
const userRoutes = require('./routes/userRoutes');
require('./config/db'); // Initialize DB connection

const app = express();
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
