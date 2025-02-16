const express = require('express');
const userRoutes = require('./routes/UserRoutes');
const connectDB = require('./config/db');
const restaurantRoutes = require('./routes/RestaurantRoutes');


const app = express();
app.use(express.json());

connectDB();
// Routes
app.use('/api/users', userRoutes);
app.use('/api/restaurant', restaurantRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
