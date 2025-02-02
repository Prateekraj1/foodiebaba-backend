const express = require('express');
const userRoutes = require('./routes/UserRoutes');
const connectDB = require('./config/db');


const app = express();
app.use(express.json());

connectDB();
// Routes
app.use('/api/users', userRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
